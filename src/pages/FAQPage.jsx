// frontend/src/pages/FAQPage.jsx
import React from 'react';
import '../styles/FaqPage.css';

const faqList = [
    { q: "What is your store's focus?", a: "Our shop specializes in high-quality science and educational products, including lab equipment and resources for learning." },
    { q: "How are orders shipped?", a: "All orders are securely packaged and shipped with tracking, ensuring they arrive safely to your doorstep." },
    { q: "Do you offer discounts for students?", a: "Yes, we offer special discounts for students and educators. Please check our student discount page for more details." },
    { q: "Are your products tested for quality?", a: "Yes, all our products undergo rigorous quality control and testing to ensure they meet high standards." },
    { q: "Can I return a product?", a: "We offer returns for products that are damaged or defective. Please contact customer support for more information on returns." },
  ];
  

const FAQPage = () => (
  <div className="faq-container">
    <h2>Frequently Asked Questions</h2>
    <ul>
      {faqList.map((item, i) => (
        <li key={i}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default FAQPage;
