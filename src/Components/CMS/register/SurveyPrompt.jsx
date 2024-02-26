import { useNavigate } from "react-router-dom";

const SurveyPrompt = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/founder");
  };
  return (
    <div>
      <div className="flex flex-col gap-16">
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
                  5
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex justify-center self-stretch overflow-clip">
          <div style={{ width: "20rem" }}>
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
                <div className="flex flex-col gap-8">
                  <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                    Contribution Time
                  </h2>
                  <div className="text-center text-8xl">
                    <div
                      className="inline-block aspect-square w-[1em] align-[-0.125em] bg-gradient-to-tr from-purple-44 to-purple-36 hover:bg-white dark:from-purple-55 dark:to-white"
                      style={{
                        maskImage:
                          'url("https://app.revveon.com/arrowsRotateUser.be456c80.svg")',
                        maskSize: "contain",
                      }}
                    />
                  </div>
                  <p>
                    Revveon is free forever but works best when it knows and
                    understands you. All we ask in return is that you take our
                    Founder Survey once a year.
                  </p>
                  <p>
                    We then get to know you like a friend should, and will be
                    able to be there for you — should the time come.
                  </p>
                  <button
                    type="button"
                    onClick={handleNavigateToDashboard}
                    className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                    style={{ background: "#C892C7", color: "#212331" }}
                  >
                    Take the Founder Survey
                  </button>
                </div>
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
    </div>
  );
};
export default SurveyPrompt;
