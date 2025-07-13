import React, { useState } from 'react';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How to Subscribe to an IPO?",
      answer: "Step 1: Login to your respective service provider. Step 2: Click on the IPO button. Step 3: Select the IPO you want to bid and enter the relevant details. Step4: Your subscription will be completed once you make the payment or give permission."
    },
    {
      id: 2,
      question: "Should I buy an IPO first day?",
      answer: ""
    },
    {
      id: 3,
      question: "How do you know if an IPO is good?",
      answer: ""
    },
    {
      id: 4,
      question: "How to check IPO start date?",
      answer: ""
    },
    {
      id: 5,
      question: "What is issue size?",
      answer: ""
    },
    {
      id: 6,
      question: "How many shares in a lot?",
      answer: ""
    },
    {
      id: 7,
      question: "How is the lot size calculated?",
      answer: ""
    },
    {
      id: 8,
      question: "Who decides the IPO price band?",
      answer: ""
    },
    {
      id: 9,
      question: "What is IPO GMP?",
      answer: ""
    },
    {
      id: 10,
      question: "How many lots should I apply for IPO?",
      answer: ""
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div style={{ 
      marginTop: '164px',
      marginBottom: '32px',
      width: '1784px'
    }}>
      {/* FAQ Header */}
      <div className="mb-12">
        <h2 className="text-black font-medium mb-4" style={{
          fontSize: '40px',
          lineHeight: '60px',
          fontFamily: 'Poppins'
        }}>
          Frequently Asked Questions?
        </h2>
        <p className="text-black font-normal" style={{
          fontSize: '24px',
          lineHeight: '36px',
          fontFamily: 'Poppins',
          maxWidth: '887px'
        }}>
          Find answers to common questions that come in your mind related to IPO.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-lg backdrop-blur-figma"
            style={{
              width: '1774px',
              minHeight: '181px',
              padding: '43px 72px'
            }}
          >
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(faq.id)}
            >
              <h3 className="text-black font-semibold" style={{
                fontSize: '30px',
                lineHeight: '45px',
                fontFamily: 'Poppins',
                maxWidth: '901px'
              }}>
                {faq.question}
              </h3>
              <span 
                className="text-blue-600 font-semibold select-none"
                style={{
                  fontSize: '48px',
                  lineHeight: '72px',
                  fontFamily: 'Poppins',
                  width: '44px',
                  height: '96px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {openFaq === faq.id ? '−' : '+'}
              </span>
            </div>
            
            {/* Expanded Answer */}
            {openFaq === faq.id && faq.answer && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-black font-semibold" style={{
                  fontSize: '24px',
                  lineHeight: '36px',
                  fontFamily: 'Poppins',
                  maxWidth: '1150px'
                }}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
