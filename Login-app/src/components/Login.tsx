import React from "react";


const Login = () => {
  return (
    <div className="flex items-center justify-center bg-[#B6B6B6] w-[1420px] h-[980px] mx-auto">
      <div className="w-[440px] h-[603px] border border-[#E3E8EF] rounded-[48px] p-[8px] bg-white/50 shadow-md flex gap-[10px]">
        <div className="w-[424px] h-[587px] bg-white rounded-[40px] p-[32px] flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <button className="w-[44px] h-[44px] p-[10px]">
              <img src="/icons/arrow-left.svg" alt="" />
            </button>
            <button className="w-[44px] h-[44px] p-[10px]">
              <img src="/icons/x-close.svg" alt="" />
            </button>
          </div>
          <div className="h-[463px] flex flex-col gap-[40px]">
            <div className="w-full h-[141px] flex flex-col gap-[16px]">
              <div className="flex justify-center">
                <img src="/icons/Logo.svg" className="w-[48px] h-[44px]" />
              </div>
              <div className="h-[81px] flex flex-col gap-2">
                <h2 className="font-bold text-[32px]/[100%] text-center">
                  Welcome to UpNation
                </h2>
                <p className="font-rubik font-normal text-[16px]/[20px] text-center text-[#697586]">
                  Login to an existing UpNation Account or Sign Up to create
                  your UpNation account
                </p>
              </div>
            </div>
            {/* start Input form */}
            <div className="w-[360px]">
              <div className="h-[48px] flex items-center justify-between border border-gray-300 rounded-2xl px-3 py-2 ">
                <img src="/icons/email.svg" alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 mx-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
                <button className="w-9 h-9 flex items-center justify-center rounded-xl p-[8px] bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90">
                  <img src="/icons/arrow-outward.svg" className="w-5 h-5" />
                </button>
              </div>
              <p className="h-[32px] font-normal text-[14px]/[16px] text-gray-500">
                If you haven't logged in using your email before, you will
                create a new wallet using this email
              </p>
            </div>
            <div className="flex items-center w-full h-4 my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="w-4 h-4 mx-2 text-gray-500 text-[12px]/[16px] text-center ">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* footer */}
            <div className="w-full h-[100px] flex flex-col gap-2">
              <div className="w-full h-[46px] rounded-2xl border border-gray-300 flex justify-start items-center gap-2 pt-[13px] pr-[12px] pb-[13px] pl-[12px]">
                <img src="/icons/GG-icon.svg" />
                <p className="text-[16px]/[20px] font-normal">Continue with Goggle</p>
              </div>
              <div className="w-full h-[46px] rounded-2xl border border-gray-300 flex justify-start items-center gap-2 pt-[13px] pr-[12px] pb-[13px] pl-[12px]">
                <img src="/icons/bold.svg" />
                <p className="text-[16px]/[20px] font-normal">Login with Linked Passkey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;



