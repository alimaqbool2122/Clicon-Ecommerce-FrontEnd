import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";
import { BlogFilterProvider } from "@/contexts/BlogFilterContext";
import BlogCategory from "@/components/blogs/BlogCategory";
import BlogProducts from "@/components/blogs/BlogProducts";

const page = () => {
  return (
    <>
      <BlogFilterProvider>
        <div>
          {/* Top Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", icon: assets.House, href: ROUTES.HOME },
              { label: "Pages", href: ROUTES.HOME },
              { label: "Blog", href: ROUTES.BLOG, active: true },
            ]}
          />
          {/* Main Content */}
          <div className="py-18">
            <div className="container">
              <div className="grid grid-cols-12 gap-6 2xl:gap-0">
                {/* Blog Category Sidebar */}
                <div className="col-span-12 xl:col-span-4 2xl:pr-10">
                  <BlogCategory />
                </div>

                {/* Blog Products */}
                <div className="col-span-12 xl:col-span-8">
                  <BlogProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlogFilterProvider>
    </>
  );
};

export default page;
