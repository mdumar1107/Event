import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const blogs = {
  1: {
    title: "10 Tips for Organizing Successful College Events",
    image: "/img2.jpg",
    date: "March 18, 2023",
    content: `
      <p>Organizing college events can be challenging but rewarding. Here are our top 10 tips:</p>
      <ol>
        <li>Start planning at least 3 months in advance</li>
        <li>Create a detailed budget and stick to it</li>
        <li>Form a reliable organizing committee</li>
        <li>Leverage social media for promotion</li>
        <li>Partner with local businesses for sponsorships</li>
        <li>Have backup plans for everything</li>
        <li>Engage student groups for participation</li>
        <li>Collect feedback for future improvements</li>
        <li>Document the event thoroughly</li>
        <li>Celebrate your team's success afterward</li>
      </ol>
      <p>Following these tips will help ensure your next college event is a hit!</p>
    `
  },
  2: {
    title: "The Ultimate Guide to Virtual Event Planning",
    image: "/img1.jpg",
    date: "April 5, 2023",
    content: `
      <p>Virtual events have become essential in today's digital world. Here's how to make yours stand out:</p>
      <h3>Choosing the Right Platform</h3>
      <p>Consider Zoom for smaller gatherings, or platforms like Hopin for larger conferences with breakout rooms.</p>
      <h3>Engagement Strategies</h3>
      <p>Use polls, Q&A sessions, and virtual networking opportunities to keep attendees engaged.</p>
      <h3>Technical Considerations</h3>
      <p>Always do a tech run-through, provide clear joining instructions, and have IT support available.</p>
    `
  },
  3: {
    title: "How to Market Your Event on a Student Budget",
    image: "/img1.jpg",
    date: "May 12, 2023",
    content: `
      <p>You don't need a big budget to effectively market your event. Try these cost-effective strategies:</p>
      <h3>Leverage Free Social Media</h3>
      <p>Create shareable content and use relevant hashtags to increase visibility.</p>
      <h3>Partner with Campus Influencers</h3>
      <p>Student leaders and popular professors can help spread the word.</p>
      <h3>Use Eye-Catching Posters</h3>
      <p>Place them strategically in high-traffic areas around campus.</p>
      <h3>Word of Mouth</h3>
      <p>Encourage committee members to personally invite friends and classmates.</p>
    `
  }
};

const BlogPage = () => {
  const { id } = useParams();
  const blog = blogs[id];

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="font-sans bg-background">
      <Header />
      
      <div className="max-w-[1200px] mx-auto py-12 px-4">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Blog Header */}
          <div className="relative w-full h-96">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Blog Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-6">Published on {blog.date}</p>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogPage;