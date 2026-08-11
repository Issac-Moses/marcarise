const express = require('express');
const path = require('path');
const UAParser = require('ua-parser-js');
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');

const app = express();
const PORT = 4000; // Using Port 4000 for Marca Rise Website

// Monitoring State
let pageViews = 0;
let startTime = Date.now();
const uniqueIPs = new Set();
const recentActivity = []; // Array of last 100 visits
const systemLogs = []; // Array of last 100 alerts
const topPages = {}; // Object to track page visit counts
const sseClients = new Set();

// Function to get clean RAM info
function getRamUsage() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;
    const usedGB = (used / 1024 / 1024 / 1024).toFixed(1);
    const totalGB = (total / 1024 / 1024 / 1024).toFixed(1);
    const percent = ((used / total) * 100).toFixed(1);
    return {
        text: `${usedGB}GB / ${totalGB}GB`,
        percent: percent,
        used: usedGB,
        total: totalGB
    };
}

// Function to get Uptime
function getUptime() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    let uptimeStr = "";
    if (d > 0) uptimeStr += `${d}d `;
    uptimeStr += `${h}h ${m}m ${s}s`;
    
    return {
        text: uptimeStr,
        seconds: seconds,
        monitoringSince: new Date(startTime).toLocaleString()
    };
}

// Helper to broadcast events to all connected SSE clients
function broadcast(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    sseClients.forEach(client => client.res.write(payload));
}

// Helper to print the dashboard header to terminal
function printTerminalDashboard() {
    const ram = getRamUsage();
    const uptime = getUptime();
    console.clear();
    console.log(chalk.bold.blue('========================================================================'));
    console.log(chalk.bold.white('                  🚀  MARCA RISE WEBSITE SERVER MONITOR                 '));
    console.log(chalk.bold.blue('========================================================================'));
    console.log(`${chalk.cyan('  STATISTICS  ')} | ${chalk.white('Uptime:')} ${uptime.text} | ${chalk.white('RAM:')} ${ram.text} | ${chalk.white('Views:')} ${pageViews} | ${chalk.white('Unique:')} ${uniqueIPs.size}`);
    console.log(chalk.blue('------------------------------------------------------------------------'));
    console.log(`${chalk.blue('  DOMAIN    ')} | https://marcarise.in`);
    console.log(chalk.blue('------------------------------------------------------------------------'));
    console.log(`${chalk.gray('  DASHBOARD ')} | http://localhost:${PORT}/monitor`);
    console.log(chalk.blue('------------------------------------------------------------------------'));
    console.log(chalk.gray('  LOGS: (Detailed visitor activity appearing below...)'));
    console.log('');
}

// API: Stats
app.get('/api/stats', (req, res) => {
    const sortedPages = Object.entries(topPages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, count]) => ({ 
            path, 
            count, 
            percent: ((count / (pageViews || 1)) * 100).toFixed(1) 
        }));

    res.json({
        uptime: getUptime(),
        ram: getRamUsage(),
        pageViews,
        uniqueVisitors: uniqueIPs.size,
        activity: recentActivity.slice(0, 15),
        logs: systemLogs.slice(0, 20),
        topPages: sortedPages
    });
});

// API: SSE Events
app.get('/api/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    sseClients.add(newClient);

    req.on('close', () => {
        sseClients.delete(newClient);
    });
});

// Route: Dashboard
app.get('/monitor', (req, res) => {
    res.sendFile(path.join(__dirname, 'monitor-dashboard.html'));
});

// Middleware for rich logging
app.use((req, res, next) => {
    const parser = new UAParser(req.headers['user-agent']);
    const device = parser.getResult();
    
    let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
    if (ip === '::1' || ip === '127.0.0.1' || ip.includes('::ffff:127.0.0.1')) ip = 'Localhost';

    const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|mp4)$/.test(req.path);
    const isInternal = req.path.startsWith('/api/') || req.path === '/monitor';

    if (!isAsset && !isInternal) {
        pageViews++;
        uniqueIPs.add(ip);
        
        topPages[req.path] = (topPages[req.path] || 0) + 1;

        const activityItem = {
            id: Date.now() + Math.random(),
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            ip: ip,
            path: req.path,
            browser: device.browser.name || 'Unknown',
            os: device.os.name || 'Unknown',
            device: device.device.type || 'Desktop',
            status: 'Active'
        };

        recentActivity.unshift(activityItem);
        if (recentActivity.length > 100) recentActivity.pop();

        broadcast('visit', activityItem);
        
        const sortedPages = Object.entries(topPages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([path, count]) => ({ 
                path, 
                count, 
                percent: ((count / pageViews) * 100).toFixed(1) 
            }));

        broadcast('stats', {
            pageViews,
            uniqueVisitors: uniqueIPs.size,
            ram: getRamUsage(),
            uptime: getUptime(),
            topPages: sortedPages
        });

        const timeStr = chalk.gray(`[${activityItem.time}]`);
        console.log(`${timeStr} ${chalk.green('VIEW')} | ${chalk.yellow(ip.padEnd(15))} | ${chalk.magenta(activityItem.os.padEnd(10))} | ${chalk.blue(activityItem.browser.padEnd(10))} | ${chalk.white(req.path)}`);
    }

    next();
});

// API Proxy: Forward /api requests to the FastAPI Python backend on port 8000
app.use('/api', (req, res) => {
    const backendUrl = `http://127.0.0.1:8000/api${req.url}`;
    const method = req.method;
    const headers = { ...req.headers };
    delete headers.host; // Let the backend handle the host header

    const http = require('http');
    const proxyReq = http.request(backendUrl, {
        method: method,
        headers: headers
    }, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });

    proxyReq.on('error', (err) => {
        const errorMsg = `Failed to reach backend: ${err.message}`;
        console.error(chalk.red(`[PROXY ERROR] | ${errorMsg}`));
        
        // Log this error to the dashboard systemLogs
        let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'System';
        if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
        if (ip === '::1' || ip === '127.0.0.1' || ip.includes('::ffff:127.0.0.1')) ip = 'Localhost';
        
        const logItem = {
            time: new Date().toLocaleTimeString(),
            level: 'ERROR',
            message: `Proxy Error: ${err.message}`,
            ip: ip
        };
        systemLogs.unshift(logItem);
        if (systemLogs.length > 100) systemLogs.pop();
        broadcast('log', logItem);

        // Return a clean 200 JSON error payload to bypass Cloudflare 502 hijacking and prevent frontend crashes
        res.status(200).json({
            status: "error",
            message: "Backend is currently starting or unreachable. Please try again shortly."
        });
    });
});

// Serve frontend/dist/ directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle SPA 404s (redirect to index.html for React router)
app.use((req, res) => {
    const isNoisy = /(robots\.txt|favicon\.ico|apple-touch-icon.*)/.test(req.path);
    if (!isNoisy) {
        let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();
        
        const logItem = {
            time: new Date().toLocaleTimeString(),
            level: 'WARN',
            message: `404 Not Found: ${req.path}`,
            ip: ip || 'Unknown'
        };
        systemLogs.unshift(logItem);
        if (systemLogs.length > 100) systemLogs.pop();
        
        broadcast('log', logItem);
        console.log(chalk.red(`[ALERT]   | 404 NOT FOUND | Source: ${ip} | Path: ${req.path}`));
    }
    
    res.status(404).sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'), (err) => {
        if (err) res.status(404).send('Not Found');
    });
});

app.listen(PORT, () => {
    printTerminalDashboard();
    setInterval(printTerminalDashboard, 60000);
    setInterval(() => {
        broadcast('stats', {
            pageViews,
            uniqueVisitors: uniqueIPs.size,
            ram: getRamUsage(),
            uptime: getUptime()
        });
    }, 5000);
});
