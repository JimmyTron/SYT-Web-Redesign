import React from "react";

import { Advert, BlogHeader, BlogBody } from "./sections";

function Blog2() {
  return (
    <div className="max-w-[1024px] mx-auto border border-green-500">
      <Advert />
      <BlogHeader />
      <BlogBody />
    </div>
  );
}

export default Blog2;
