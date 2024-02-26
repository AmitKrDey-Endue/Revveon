import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { linkedInFetch } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SetLinkedInHandle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  console.log(status);
  const schema = z.object({
    linkedInProf: z.string().nonempty("LinkedIn username is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);

    const formData = {
      linkedInProf: extractLinkedInHandle(data.linkedInProf),
    };

    console.log("Button clicked", formData);

    try {
      // Wait for the linkedInFetch action to complete
      await dispatch(linkedInFetch(formData));

      // Check if the action was successful
      if (status === "success") {
        // If successful, navigate to the survey prompt page
        navigate("/surveyprompt");
      } else {
        // Handle the case when the action was not successful
        console.log("Action was not successful.");
      }
    } catch (error) {
      // Handle any errors that occur during the dispatch
      console.error("Error occurred during dispatch:", error);
    }
  };

  // Helper function to extract LinkedIn username from the URL
  const extractLinkedInHandle = (input) => {
    // Remove "https://in.linkedin.com/in/" if it exists
    const cleanedInput = input.replace(/.*\/in\//, "");

    // Extract only the username part if the input contains any slash
    const username = cleanedInput.includes("/")
      ? cleanedInput.split("/")[0]
      : cleanedInput;

    return username.trim(); // Trim any leading/trailing whitespaces
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-10">
        <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
          Create your Revveon account
        </h1>
        <nav aria-label="Steps">
          <ol className="flex items-center">
            <li className="flex items-center">
              <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-transparent bg-primary text-white dark:text-gray-24">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fasl"
                  data-icon="check"
                  className="svg-inline--fa fa-check animate-pop-in"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M448.1 118.2L437 129.7 173.6 404l-11.5 12-11.5-12L11.1 258.8 0 247.2l23.1-22.2 11.1 11.5L162.1 369.8 414 107.5 425 96l23.1 22.2z"
                  />
                </svg>
              </div>
              <div className="h-[1px] w-5 transition-colors bg-primary" />
            </li>
            <li className="flex items-center">
              <div
                className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-primary dark:bg-gray-31"
                aria-current="step"
              >
                2
              </div>
              <div className="h-[1px] w-5 transition-colors bg-gray-67 dark:bg-gray-42" />
            </li>
            <li className="flex items-center">
              <div
                className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31"
                aria-current="step"
              >
                3
              </div>
              <div className="h-[1px] w-5 transition-colors bg-gray-67 dark:bg-gray-42" />
            </li>
            <li className="flex items-center">
              <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                4
              </div>
              <div className="h-[1px] w-5 transition-colors bg-gray-67 dark:bg-gray-42" />
            </li>
            <li className="flex items-center">
              <div className="flex aspect-square w-10 items-center justify-center rounded-full border font-thin transition-colors border-gray-67 dark:border-gray-42 dark:bg-gray-31">
                5
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex justify-center self-stretch overflow-clip ">
        <div style={{ width: "20rem", paddingTop: "5rem" }}>
          <div
            className="flex -translate-x-1/3"
            style={{ animationDuration: "300ms", width: "calc(60rem)" }}
          >
            <div
              className="shrink-0"
              style={{
                animationDuration: "300ms",
                width: "20rem",
                transformOrigin: "left center",
              }}
            />
            <div
              className="shrink-0"
              style={{
                animationDuration: "300ms",
                width: "20rem",
                transformOrigin: "left center",
              }}
            >
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                  Your Profile
                </h2>
                <div className="flex flex-col gap-1 self-stretch">
                  <div className="contents leading-tight">
                    <label
                      className="flex items-center gap-1"
                      htmlFor="radix-:r17:"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="linkedin"
                        className="svg-inline--fa fa-linkedin "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path
                          fill="currentColor"
                          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                        />
                      </svg>
                      LinkedIn username
                    </label>
                  </div>
                  <div
                    className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24"
                    style={{ backgroundColor: "hsl(227 23% 27%" }}
                  >
                    <div className="flex items-center bg-gray-94 p-2 dark:bg-gray-31">
                      <small className="contents text-sm font-normal leading-snug tracking-wide">
                        www.linkedin.com/in/
                      </small>
                    </div>
                    <input
                      className="min-w-0 grow  p-2 focus:outline-none bg-gray-700"
                      type="text"
                      required=""
                      title=""
                      id="radix-:r17:"
                      name="linkedInHandle"
                      style={{ backgroundColor: "hsl(230 19% 24%" }}
                      {...register("linkedInProf")}
                    />
                  </div>
                  {errors.linkedInProf && (
                    <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-500">
                      {errors.linkedInProf.message}
                    </small>
                  )}
                  <br />
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    To save you a heap of time, we`&apos;`ll fetch your details
                    from LinkedIn. You can delete any information you`&apos;`d
                    rather not include.
                  </small>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="flex items-center
                     justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                    style={{ background: "#C892C7", color: "#212331" }}
                  >
                    Fetch my LinkedIn profile
                  </button>
                </div>
              </form>
            </div>
            <div
              className="shrink-0"
              style={{
                animationDuration: "300ms",
                width: "20rem",
                transformOrigin: "right center",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetLinkedInHandle;
