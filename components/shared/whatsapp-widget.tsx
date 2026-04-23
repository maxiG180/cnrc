"use client";

import { useState, useEffect } from "react";
import { company } from "@/content/shared/company-info";

export function WhatsappWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipShown, setTooltipShown] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Format phone number for WhatsApp (remove spaces and special chars)
  const whatsappNumber = company.phones.mobile.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, gostaria de obter mais informações.")}`;

  // Handle scroll to show/hide button
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowTooltip(false);
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show tooltip only once when button first becomes visible
  useEffect(() => {
    if (!isVisible || tooltipShown) return;

    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      setIsFadingOut(false);
    }, 1000);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4500); // Start fade out animation 500ms before hiding

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
      setTooltipShown(true);
      setIsFadingOut(false);
    }, 5000); // Hide after 5 seconds total

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible, tooltipShown]);

  return (
    <>
      <style jsx>{`
        @keyframes tooltipBounce {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tooltipFadeOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
        }

        .whatsapp-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
        }

        @media (min-width: 768px) {
          .whatsapp-widget {
            bottom: 32px;
            right: 32px;
          }
        }

        .whatsapp-tooltip {
          position: absolute;
          bottom: 100%;
          right: 0;
          margin-bottom: 8px;
          white-space: nowrap;
          padding: 12px 16px;
          border-radius: 8px;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .whatsapp-tooltip.hidden {
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }

        .whatsapp-tooltip.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          animation: tooltipBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .whatsapp-tooltip.fading-out {
          animation: tooltipFadeOut 0.5s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }

        .whatsapp-tooltip p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .whatsapp-tooltip-arrow {
          position: absolute;
          top: 100%;
          right: 24px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #ffffff;
        }

        .whatsapp-button {
          position: relative;
          display: block;
          width: 56px;
          height: 56px;
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
        }

        @media (min-width: 768px) {
          .whatsapp-button {
            width: 64px;
            height: 64px;
          }
        }

        .whatsapp-button.hidden {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
        }

        .whatsapp-button.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .whatsapp-button:hover {
          transform: scale(1.1);
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.15));
        }

        .whatsapp-button:active {
          transform: scale(0.95);
        }

        .whatsapp-button img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .whatsapp-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FF3B30;
          box-shadow: 0 2px 6px rgba(255, 59, 48, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>

      <div className="whatsapp-widget">
        {/* Tooltip */}
        <div className={`whatsapp-tooltip ${
          showTooltip || isHovering
            ? isFadingOut && !isHovering ? 'visible fading-out' : 'visible'
            : 'hidden'
        }`}>
          <p>Precisa de ajuda?</p>
          <div className="whatsapp-tooltip-arrow"></div>
        </div>

        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`whatsapp-button ${isVisible ? 'visible' : 'hidden'}`}
          aria-label="Contactar via WhatsApp"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
          {/* Badge - only show when tooltip is visible */}
          {(showTooltip || isHovering) && (
            <div className="whatsapp-badge">1</div>
          )}
        </a>
      </div>
    </>
  );
}
