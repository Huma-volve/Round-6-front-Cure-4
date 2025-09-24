import { REVIEWS } from "../../../data/rewiew";
import ReviewSlider from "./ReviewSlider";

export default function Reviews() {
  return (
    <section className="py-12 bg-white text-center h-[500px]">
      <h2 className="text-xl md:text-3xl mb-10 leading-tight">
        Reviews <br />
        That Speak for Themselves
      </h2>

      <ReviewSlider reviews={REVIEWS} />
    </section>
  );
}
