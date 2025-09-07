const Login = () => {
  return (
    <div className="flex items-center justify-center bg-[#B6B6B6] w-[88.75rem] h-[61.25rem] mx-auto">
      <div className="w-[27.5rem] h-[37.6875rem] border border-[#E3E8EF] rounded-[3rem] p-[.5rem] bg-white/50 shadow-md flex gap-[.625rem]">
        <div className="w-[26.5rem] h-[36.6875rem] bg-white rounded-[2.5rem] p-[2rem] flex flex-col gap-[1rem]">
          <div className="flex justify-between">
            <button className="w-[2.75rem] h-[2.75rem] p-[.625rem] bg-gray-50 rounded-[.875rem]">
              <img src="/icons/arrow-left.svg" alt="" />
            </button>
            <button className="w-[2.75rem] h-[2.75rem] p-[.625rem]  bg-gray-50 rounded-[.875rem] ">
              <img src="/icons/x-close.svg" alt="" />
            </button>
          </div>
          <div className="max-h-[28.9375rem] flex flex-col gap-[2.5rem]">
            <div className="w-full h-[8.8125rem] flex flex-col gap-[1rem]">
              <div className="flex justify-center">
                <img src="/icons/Logo.svg" className="w-[3rem] h-[2.75rem]" />
              </div>
              <div className="h-[5.0625rem] flex flex-col gap-2">
                <h2
                  className="font-bold text-[1.5rem] sm:text-[2rem]/[100%] text-center"
                  style={{ fontFamily: "Komplekt" }}
                >
                  Welcome to UpNation
                </h2>
                <p
                  className=" font-normal text-[1rem]/[1.25rem] text-center text-[#697586]"
                  style={{ fontFamily: "Rubik" }}
                >
                  Login to an existing UpNation Account or Sign Up to create
                  your UpNation account
                </p>
              </div>
            </div>
            {/* start Input form */}
            <div className="w-full sm:w-[22.5rem]">
              <div className="h-[3rem] flex items-center justify-between border border-gray-300 rounded-2xl pt-[.375rem] pb-[.375rem] pr-[.375rem] pl-[.75rem]">
                <img src="/icons/email.svg" alt="" />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 mx-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
                <button className="w-9 h-9 flex items-center justify-center rounded-xl p-[.5rem] bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90">
                  <img src="/icons/arrow-outward.svg" className="w-5 h-5" />
                </button>
              </div>
              <p
                className="h-[2rem] font-normal text-[.875rem]/[1rem] text-gray-500"
                style={{ fontFamily: "Rubik" }}
              >
                If you haven't logged in using your email before, you will
                create a new wallet using this email
              </p>
            </div>
            <div className="flex items-center w-full h-4 my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="w-4 h-4 mx-2 text-gray-500 text-[.75rem]/[1rem] text-center ">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* footer */}
            <div className="w-full h-[6.25rem] flex flex-col gap-2">
              <div className="w-full h-[2.875rem] rounded-2xl border border-gray-300 flex justify-start items-center gap-2 pt-[.8125rem] pr-[.75rem] pb-[.8125rem] pl-[.75rem]">
                <img src="/icons/GG-icon.svg" />
                <p
                  className="text-[1rem]/[1.25rem] font-normal"
                  style={{ fontFamily: "Rubik" }}
                >
                  Continue with Goggle
                </p>
              </div>
              <div className="w-full h-[2.875rem] rounded-2xl border border-gray-300 flex justify-start items-center gap-2 pt-[.8125rem] pr-[.75rem] pb-[.8125rem] pl-[.75rem]">
                <img src="/icons/bold.svg" />
                <p
                  className="text-[1rem]/[1.25rem] font-normal"
                  style={{ fontFamily: "Rubik" }}
                >
                  Login with Linked Passkey
                </p>
              </div>
            </div>
            {/* <div className="clear-both"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
