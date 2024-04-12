"use client";

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { url } from "inspector";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  testimonial: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO of Acme Inc.",
    testimonial:
      "Thanks to FINPLAN, our team has become more efficient than ever. The intuitive design and powerful features really made a difference in our workflow!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CFO of Beta LLC",
    testimonial:
      "FINPLAN's insights have transformed our financial planning process. It's user-friendly and incredibly powerful.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = () => {
    setActiveTestimonial((prevActiveTestimonial) =>
      prevActiveTestimonial === testimonials.length - 1
        ? 0
        : prevActiveTestimonial + 1
    );
  };

  const handleBack = () => {
    setActiveTestimonial((prevActiveTestimonial) =>
      prevActiveTestimonial === 0
        ? testimonials.length - 1
        : prevActiveTestimonial - 1
    );
  };

  if (testimonials.length === 0) return null;

  return (
    <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
      </Typography>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          position: "relative",
          p: 3,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Box
            key={testimonial.id}
            sx={{
              display: activeTestimonial === index ? "block" : "none",
              flexDirection: matchesSM ? "column" : "row",
              alignItems: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <Avatar
              alt={testimonial.name}
              src={testimonial.image}
              sx={{ width: 90, height: 90, mx: "auto" }}
            />
            <Typography variant="body1">
              &quot;{testimonial.testimonial}&quot;
            </Typography>
            <Typography variant="subtitle2">
              - {testimonial.name}, {testimonial.position}
            </Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <IconButton onClick={handleBack} aria-label="Previous testimonial">
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNext} aria-label="Next testimonial">
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
