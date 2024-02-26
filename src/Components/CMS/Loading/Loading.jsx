export default function Loading() {
  return (
    <div
      className="relative flex aspect-square items-center justify-center"
      style={{ width: "1em", perspective: "2em" }}
    >
      <div className="absolute aspect-square w-[80%] animate-gyro-sm rounded-full border border-current"></div>
      <div className="absolute aspect-square w-[90%] animate-gyro-md rounded-full border border-current"></div>
      <div className="absolute aspect-square w-full animate-gyro-lg rounded-full border border-current"></div>
    </div>
  );
}
