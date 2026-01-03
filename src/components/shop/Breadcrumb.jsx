import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../constants/assets";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="bg-[#F2F4F5] py-6">
      <div className="container">
        <div className="flex items-center flex-wrap gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Breadcrumb Link */}
              <Link
                href={item.href}
                className={`inline-flex items-center gap-2 text-sm font-medium
                                    ${
                                      item.active
                                        ? "text-[#2DA5F3]"
                                        : "text-[#5F6C72]"
                                    } 
                                `}
              >
                {item.icon && (
                  <Image src={item.icon} alt="icon" width={20} height={20} />
                )}
                {item.label}
              </Link>

              {/* Arrow (except last item) */}
              {index !== items.length - 1 && (
                <Image
                  src={assets.caretRight}
                  alt="arrow"
                  width={12}
                  height={12}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
