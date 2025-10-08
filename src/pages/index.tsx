import React, { useEffect, useState } from "react";
// Import new dedicated pages
export { default as LeftWing } from './LeftWing';
export { default as RightWing } from './RightWing';
export { default as Home } from './Home';
export { default as Search } from './Search';
export { default as EnhancedSearch } from './EnhancedSearch';
export { default as CommunityHub } from './CommunityHub';

// Export GoogleStyleHomepage as the default export
import GoogleStyleHomepage from '../components/GoogleStyleHomepage';
export { GoogleStyleHomepage };
export default GoogleStyleHomepage;
