# Image Integration Guide

## Overview
The homepage has been updated to prominently feature an image that reflects unity, national pride, and hope for Colombia's future, inspired by the themes of "Futuro".

## Current Implementation

### Image Placeholder
- A placeholder SVG image has been created at `/public/futuro-placeholder.svg`
- The image incorporates Colombian flag colors (yellow, blue, red)
- Features symbolic elements: unity star, "FUTURO" text, and unity hands
- Represents themes of national pride and hope

### Image Integration
The image is integrated into the `HeroSection` component with:
- **Prominent positioning**: Right column in desktop layout, featured prominently on mobile
- **Accessibility**: Proper alt text describing unity and hope themes
- **Responsiveness**: Scales appropriately across all screen sizes
- **Modern design**: Glass morphism effects and decorative elements
- **Enhanced interactivity**: Floating elements and hover effects

## Replacing with Actual Image

To replace the placeholder with the actual `image1`:

1. **Add the image file**:
   ```bash
   # Place image1 in the public directory
   cp image1 /home/runner/work/nuestro-pulso-test/nuestro-pulso-test/public/
   ```

2. **Update the component**:
   - Open `components/HeroSection.js`
   - Find line with `src="/futuro-placeholder.svg"`
   - Replace with the path to your actual image:
   ```jsx
   <Image
     src="/image1" // or "/image1.jpg" depending on file extension
     alt="Unity and hope for Colombia's future - representing national pride and the vision of 'Futuro'"
     width={400}
     height={300}
     className="w-full h-auto object-cover rounded-2xl"
     priority
   />
   ```

## Features Implemented

### Design Elements
- **Two-column layout**: Content on left, featured image on right
- **Colombian flag gradient**: Background maintains patriotic colors
- **Glass morphism effects**: Modern, elevated design aesthetic
- **Enhanced typography**: "Futuro" theme highlighted in content
- **Decorative elements**: Flag-colored dots and floating animations

### Accessibility
- Semantic HTML structure
- Proper alt text for screen readers
- High contrast text with drop shadows
- Keyboard navigation support
- Responsive text sizing

### Responsiveness
- Mobile-first design approach
- Stacks content vertically on smaller screens
- Maintains image prominence across all breakpoints
- Scalable text and interactive elements

### Interactivity
- Hover effects on buttons and image container
- Animated floating elements
- Smooth transitions and transforms
- Pulse and bounce animations for visual interest

## Theme Integration

The updated design emphasizes:
- **Unity**: Through symbolic imagery and inclusive messaging
- **National Pride**: Colombian flag colors and patriotic messaging
- **Hope for Future**: "Futuro" theme woven throughout content
- **Civic Engagement**: Clear calls-to-action for participation

The image serves as a focal point that reinforces these themes while maintaining the site's modern, accessible, and responsive design principles.