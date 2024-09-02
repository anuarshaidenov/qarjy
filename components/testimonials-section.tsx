import React from "react";
import ScrollingTestimonials from "./ui/scrolling-testimonials";

type Props = {};

const data = [
  {
    name: "Yerkhan B.",
    description:
      "The budgeting app is straightforward and easy to use. I appreciated how it broke down my expenses without overwhelming me with too many options.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    position: "Founder of BAC",
  },
  {
    name: "Alisher E.",
    description:
      "This app helped me manage my savings better. I like how it offers different methods, so I can choose what suits my lifestyle best.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    position: "Founder of BAC",
  },
];

export const TestimonialsSection = (props: Props) => {
  return (
    <section className="py-16">
      <ScrollingTestimonials data={data} />
    </section>
  );
};
