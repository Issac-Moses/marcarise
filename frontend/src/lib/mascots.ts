import hello from "@/assets/MJ_MOSCOT/MJ_HELLO.png";
import thinking from "@/assets/MJ_MOSCOT/MJ_THINKING.png";
import working from "@/assets/MJ_MOSCOT/MJ_DEPPTHINKING.png";
import explaining from "@/assets/MJ_MOSCOT/MJ_EXPLAINING.png";
import success from "@/assets/MJ_MOSCOT/MJ_CELEBRATION.png";
import confused from "@/assets/MJ_MOSCOT/MJ_CONFUSED.jpeg";
import errorImg from "@/assets/MJ_MOSCOT/MJ_ERROR.png";
import warning from "@/assets/MJ_MOSCOT/MJ_WARNING.png";
import listening from "@/assets/MJ_MOSCOT/MJ_LISTENING.png";

export type MascotState =
  | "idle"
  | "hello"
  | "thinking"
  | "working"
  | "explaining"
  | "success"
  | "confused"
  | "error"
  | "warning"
  | "listening";

export const MASCOTS: Record<MascotState, string> = {
  idle: hello,
  hello: hello,
  thinking: thinking,
  working: working,
  explaining: explaining,
  success: success,
  confused: confused,
  error: errorImg,
  warning: warning,
  listening: listening,
};

export function mascotFor(state?: string): string {
  if (state && state in MASCOTS) return MASCOTS[state as MascotState];
  return MASCOTS.explaining;
}
