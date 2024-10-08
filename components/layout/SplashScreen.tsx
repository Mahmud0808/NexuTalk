import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="w-full h-full bg-white flex gap-3 justify-center items-center text-primary">
      <Image
        id="loader"
        src="/images/preloader.gif"
        alt=""
        width={60}
        height={60}
        unoptimized={true}
      />
      <h3 className="text-black text-3xl tracking-wide">
        <span className="font-light">nexu</span>
        <span className="font-bold">talk</span>
      </h3>
    </div>
  );
};

export default SplashScreen;
