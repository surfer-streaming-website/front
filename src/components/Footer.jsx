import React from "react";
import "../Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
          <span>서퍼(주) 대표이사 홍순호</span>
          <span>주소 경기 성남시 분당구 성남대로 34 하나프라자 6층</span>
        </div>
        <br />
        <div>
          <span>대표 전화 1588-1671</span>
          <span>이메일 hongsoonho357@gmail.com</span>
        </div>
        <br />
        <br />
        <br />
        <div className="footer-bottom">
          <span>
            <a
              href="https://www.naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </a>
          </span>
          <span>
            <a
              href="https://www.naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              surfer이용약관
            </a>
          </span>
          <span>
            <a
              href="https://www.naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              surfer 커뮤니티 운영정책
            </a>
          </span>
          <span>
            <a
              href="https://www.naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              결제/환불 안내
            </a>
          </span>
          <span>
            <a
              href="https://www.naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              제작자
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
