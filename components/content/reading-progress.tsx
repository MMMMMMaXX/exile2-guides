/** 文件职责：在详情页顶部显示本地计算的阅读进度，不记录或发送阅读行为。 */
import { useEffect, useState } from "react";

/** 监听滚动并将文档阅读比例限制在 0～100。 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /** 根据可滚动高度更新阅读进度，短页面保持为零。 */
    function updateProgress() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0;
      setProgress(nextProgress);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
