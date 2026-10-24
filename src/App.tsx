import { useEffect, useRef, useState } from 'react';
import { initWizardChess } from './wizardChessEngine.js';

export default function App() {
  const initializedRef = useRef(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    initWizardChess();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSheetOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRestoreUI = () => {
    const win = window as unknown as { wizardChess?: { toggleUI?: (force?: boolean) => void } };
    if (win.wizardChess?.toggleUI) {
      win.wizardChess.toggleUI(false);
    } else {
      document.body.classList.remove('cinematic-ui-hidden');
      const btnHide = document.getElementById('btn-hide-ui');
      if (btnHide) btnHide.textContent = 'Hide UI [H]';
    }
  };

  return (
    <>
      <div id="loading-overlay">
        <div className="loader-title">BeoChess 3D</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" id="loader-bar"></div>
        </div>
        <div id="loader-text">Đang tạo dựng căn phòng Pixar 3D &amp; Sân vườn làng quê...</div>
      </div>

      <div id="canvas-container"></div>

      <button
        type="button"
        className="hud-btn mobile-only-restore-ui"
        id="btn-mobile-show-ui"
        onClick={handleRestoreUI}
        title="Hiển thị bảng điều khiển"
      >
        Giao Diện
      </button>

      <div id="hud-top">
        <div className="hud-group" id="hud-left">
          <div className="brand-pill">
            <span className="brand-title">BeoChess 3D</span>
          </div>
          <div className="status-pill" id="status-pill">
            <span className="turn-dot" id="turn-dot"></span>
            <span id="turn-text">Lượt Trắng</span>
            <span className="mode-badge" id="mode-badge">Đang chơi quân Trắng</span>
          </div>
        </div>

        <button
          type="button"
          className={`hud-btn mobile-controls-trigger ${mobileSheetOpen ? 'active' : ''}`}
          id="btn-mobile-controls"
          aria-expanded={mobileSheetOpen}
          aria-controls="hud-right"
          onClick={() => setMobileSheetOpen((prev) => !prev)}
        >
          {mobileSheetOpen ? 'Close' : 'Controls'}
        </button>

        <div
          className={`mobile-sheet-backdrop ${mobileSheetOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMobileSheetOpen(false);
          }}
          aria-hidden="true"
        ></div>

        <div
          className={`hud-group ${mobileSheetOpen ? 'mobile-sheet-open' : ''}`}
          id="hud-right"
        >
          <div
            className="mobile-sheet-handle-wrap"
            onClick={(e) => {
              e.stopPropagation();
              setMobileSheetOpen(false);
            }}
            aria-hidden="true"
          >
            <div className="mobile-sheet-handle"></div>
          </div>

          <div className="mobile-sheet-header">
            <span className="mobile-sheet-title">Controls</span>
            <button
              type="button"
              className="mobile-sheet-close"
              id="btn-mobile-sheet-close"
              onClick={(e) => {
                e.stopPropagation();
                setMobileSheetOpen(false);
              }}
              aria-label="Close Controls"
            >
              Close ✕
            </button>
          </div>

          <div className="mobile-sheet-section-label">Thao Tác Trò Chơi</div>

          <button
            className="hud-btn"
            id="btn-side-toggle"
            title="Đổi phe chơi giữa Trắng và Đen"
            onClick={() => setMobileSheetOpen(false)}
          >
            Đổi Sang Quân Đen
          </button>
          <button
            className="hud-btn"
            id="btn-ai-move"
            title="Để máy AI đi nước tiếp theo"
            onClick={() => setMobileSheetOpen(false)}
          >
            AI Đi Cờ
          </button>
          <button
            className="hud-btn"
            id="btn-reset"
            title="Bắt đầu ván cờ mới"
            onClick={() => setMobileSheetOpen(false)}
          >
            Ván Mới
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">
            <span>Góc Nhìn Camera</span>
            <span className="mobile-sheet-section-sub">Chạm lần nữa để đổi chiều</span>
          </div>

          <button
            className="hud-btn active"
            id="btn-cam-player"
            title="Góc nhìn người chơi tại bàn"
          >
            Góc Bàn Cờ
          </button>
          <button
            className="hud-btn"
            id="btn-cam-top"
            title="Góc nhìn từ trên cao xuống"
          >
            Từ Trên Cao
          </button>
          <button
            className="hud-btn"
            id="btn-cam-side"
            title="Góc nhìn cạnh bên bàn cờ"
          >
            Góc Nghiêng
          </button>
          <button
            className="hud-btn"
            id="btn-cam-wide"
            title="Toàn cảnh sân vườn &amp; phòng khách"
          >
            Sân Vườn &amp; Phòng
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">Giao Diện</div>

          <button
            className="hud-btn"
            id="btn-hide-ui"
            title="Ẩn/hiện giao diện (Phím tắt: H)"
            onClick={() => setMobileSheetOpen(false)}
          >
            Ẩn Giao Diện [H]
          </button>

          <div className="mobile-sheet-hint">
            <strong>Cảm ứng:</strong> Chạm quân để chọn &nbsp;•&nbsp; 1 ngón: Xoay &nbsp;•&nbsp; 2 ngón: Trượt &nbsp;•&nbsp; Kẹp: Thu phóng
          </div>
        </div>
      </div>

      <div id="hud-bottom">
        <div className="hint-pill" id="controls-hint">
          <strong>Điều khiển:</strong> Nhấp quân cờ để di chuyển &nbsp;•&nbsp; Chuột trái: Xoay 360° &nbsp;•&nbsp; Chuột phải: Trượt góc nhìn &nbsp;•&nbsp; Cuộn: Thu phóng &nbsp;•&nbsp; H: Ẩn/Hiện giao diện
        </div>
        <div className="captured-pill" id="captured-tray"></div>
      </div>

      <div id="checkmate-overlay" role="status" aria-live="polite">
        <div className="checkmate-banner">
          <div className="checkmate-ornament">✦ &nbsp; Sanctum Judgment &nbsp; ✦</div>
          <div className="checkmate-crown" id="checkmate-crown">♔</div>
          <div className="checkmate-title" id="checkmate-title">Checkmate</div>
          <div className="checkmate-rule"></div>
          <div className="checkmate-subtitle" id="checkmate-subtitle">
            White Triumphs • The Black King Has Fallen
          </div>
          <div className="checkmate-actions">
            <button className="checkmate-btn" id="btn-checkmate-replay">
              Replay King Fall
            </button>
            <button className="checkmate-btn" id="btn-checkmate-newgame">
              New Game
            </button>
            <button className="checkmate-btn secondary" id="btn-checkmate-dismiss">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
