import React from "react";
import Image from "next/image";
import { coreTeamMembers } from "@/data/about-us/about-us";

const OurTeam = () => {
  return (
    <>
      <div className="shadow-[inset_0px_1px_0px_#E4E7E9]">
        <div className="container py-12 md:py-18 space-y-8 sm:space-y-10">
          <h2 className="text-2xl sm:text-[32px] text-center font-semibold text-[#191C1F] sm:leading-5">
            Our core team member
          </h2>
          <ul className="grid grid-cols-12 gap-6">
            {coreTeamMembers.map((member) => (
              <li
                key={member.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3"
              >
                <div className="border border-[#E4E7E9] rounded-sm p-6 flex items-center gap-6">
                  <Image
                    src={member.avatar}
                    alt="member"
                    width={64}
                    height={64}
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-[#191C1F]">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#475156]">{member.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
