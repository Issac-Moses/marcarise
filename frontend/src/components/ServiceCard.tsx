// import { motion } from "framer-motion";

// export default function ServiceCard({
//   title,
//   category,
//   brand
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       className="group relative overflow-hidden rounded-3xl bg-[#1d1d1f] p-8 min-h-[320px] border border-white/10 hover:border-[#ff5f53] transition-all duration-500"
//     >
//       {/* Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#ff5f53]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col justify-between h-full">
//         <div>
//           <span className="text-sm text-[#ff5f53] uppercase tracking-widest">
//             {category}
//           </span>

//           <h3 className="text-2xl font-bold text-white mt-4 leading-snug">
//             {title}
//           </h3>
//         </div>

//         <div className="mt-10 flex items-center justify-between">
//           <p className="text-gray-400 text-sm">{brand}</p>

//           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ff5f53] transition-all">
//             →
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }