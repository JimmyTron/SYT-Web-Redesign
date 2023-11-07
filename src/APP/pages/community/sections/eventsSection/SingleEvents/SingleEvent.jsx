import React, { useEffect, useState } from "react";
// import {
//   singleEvents,
//   community,
//   MasterBase,
//   mpesapayments,
//   techrecruiters,
//   mentorlst,
//   uxhiringafrica,
// } from "../../../../../../assets/images/community";
import Events from "../../../../events/sections/eventsSection/Events";
import { Link, useParams } from "react-router-dom";
import { parse, format } from "date-fns";
import { useOneEvent } from "../../../../../../hooks/Queries/singleEvent/useSingleEvent";
import { fetchEvents } from "../../../../../../hooks/Queries/eventsSection/useEventCategories";

function SingleEvent() {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [similarEvents, setSimilarEvents] = useState({});

  const { id } = useParams();
  const { data: oneEvent, isLoading, isError, isSuccess } = useOneEvent(id);

  useEffect(() => {
    if (typeof oneEvent !== "undefined") {
      const fetchData = async () => {
        const data = await fetchEvents({
          page_size: 5,
          category: oneEvent.category.name,
        });

        const similarEv = data.results.filter(
          (event) => event.id !== oneEvent.id
        );

        setSimilarEvents((prevState) => {
          return (prevState = similarEv);
        });
      };
      fetchData();
    }
  }, [oneEvent]);

  return (
    <>
      {isError && <p>Error fetching event!</p>}
      {isLoading && <p>Loading event...</p>}
      {isSuccess && typeof oneEvent !== "undefined" ? (
        <div className="w-screen flex flex-col ">
          <div
            className="bg-cover bg-no-repeat py-24 px-30 h-full md:py-44"
            style={{ backgroundImage: `url(${oneEvent.poster}` }}
          />
          <div className="px-20">
            <div className="flex flex-row justify-between pt-10 pb-2 ">
              <h2>{format(new Date(oneEvent.date), "EEE MMM d, yyyy")}</h2>
              <div className="flex flex-row justify-between ">
                <div className="">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9062 2.5C12.293 2.5 10.8805 3.19375 10 4.36641C9.11953 3.19375 7.70703 2.5 6.09375 2.5C4.80955 2.50145 3.57837 3.01223 2.6703 3.9203C1.76223 4.82837 1.25145 6.05955 1.25 7.34375C1.25 12.8125 9.35859 17.2391 9.70391 17.4219C9.79492 17.4708 9.89665 17.4965 10 17.4965C10.1033 17.4965 10.2051 17.4708 10.2961 17.4219C10.6414 17.2391 18.75 12.8125 18.75 7.34375C18.7486 6.05955 18.2378 4.82837 17.3297 3.9203C16.4216 3.01223 15.1904 2.50145 13.9062 2.5ZM10 16.1563C8.57344 15.325 2.5 11.5383 2.5 7.34375C2.50124 6.39101 2.88026 5.47765 3.55396 4.80396C4.22765 4.13026 5.14101 3.75124 6.09375 3.75C7.61328 3.75 8.88906 4.55938 9.42188 5.85938C9.46896 5.97401 9.54907 6.07205 9.65201 6.14105C9.75494 6.21005 9.87607 6.2469 10 6.2469C10.1239 6.2469 10.2451 6.21005 10.348 6.14105C10.4509 6.07205 10.531 5.97401 10.5781 5.85938C11.1109 4.55703 12.3867 3.75 13.9062 3.75C14.859 3.75124 15.7724 4.13026 16.446 4.80396C17.1197 5.47765 17.4988 6.39101 17.5 7.34375C17.5 11.532 11.425 15.3242 10 16.1563Z"
                      fill="#323433"
                    />
                  </svg>
                </div>
                <div className="ml-6">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7502 11.4986C12.3333 11.4985 11.9205 11.582 11.5365 11.7442C11.1524 11.9065 10.8048 12.1441 10.5143 12.4431L6.91269 10.1283C7.19599 9.4018 7.19599 8.59539 6.91269 7.86891L10.5143 5.55407C11.0552 6.10822 11.7827 6.44176 12.5556 6.49002C13.3286 6.53829 14.0919 6.29783 14.6976 5.81527C15.3033 5.33272 15.7083 4.64244 15.834 3.87828C15.9596 3.11411 15.7971 2.33049 15.3779 1.67935C14.9586 1.02822 14.3125 0.555945 13.5649 0.354103C12.8172 0.152261 12.0212 0.235229 11.3312 0.58692C10.6413 0.938612 10.1065 1.53397 9.8305 2.25757C9.55455 2.98117 9.55711 3.78146 9.83769 4.50328L6.23613 6.81813C5.80243 6.37287 5.2458 6.06707 4.63741 5.9398C4.02901 5.81254 3.39648 5.86959 2.82068 6.10368C2.24487 6.33776 1.75196 6.73823 1.40494 7.25391C1.05792 7.76959 0.872559 8.37703 0.872559 8.9986C0.872559 9.62016 1.05792 10.2276 1.40494 10.7433C1.75196 11.259 2.24487 11.6594 2.82068 11.8935C3.39648 12.1276 4.02901 12.1847 4.63741 12.0574C5.2458 11.9301 5.80243 11.6243 6.23613 11.1791L9.83769 13.4939C9.59641 14.1162 9.56071 14.7994 9.73581 15.4434C9.9109 16.0875 10.2876 16.6585 10.8107 17.073C11.3339 17.4875 11.976 17.7236 12.643 17.7467C13.31 17.7699 13.9669 17.5788 14.5175 17.2016C15.0681 16.8244 15.4835 16.2808 15.7028 15.6505C15.9221 15.0201 15.9339 14.3361 15.7363 13.6986C15.5387 13.0611 15.1423 12.5035 14.6049 12.1077C14.0676 11.7118 13.4176 11.4983 12.7502 11.4986ZM12.7502 1.4986C13.121 1.4986 13.4835 1.60856 13.7919 1.81459C14.1002 2.02062 14.3405 2.31345 14.4825 2.65606C14.6244 2.99868 14.6615 3.37568 14.5892 3.73939C14.5168 4.10311 14.3382 4.4372 14.076 4.69942C13.8138 4.96165 13.4797 5.14022 13.116 5.21257C12.7523 5.28492 12.3753 5.24779 12.0327 5.10587C11.69 4.96396 11.3972 4.72363 11.1912 4.41529C10.9852 4.10695 10.8752 3.74444 10.8752 3.3736C10.8752 2.87632 11.0727 2.3994 11.4244 2.04777C11.776 1.69614 12.2529 1.4986 12.7502 1.4986ZM4.00019 10.8736C3.62935 10.8736 3.26684 10.7636 2.95849 10.5576C2.65015 10.3516 2.40983 10.0587 2.26791 9.71613C2.126 9.37352 2.08887 8.99652 2.16122 8.6328C2.23356 8.26909 2.41214 7.935 2.67436 7.67277C2.93659 7.41055 3.27068 7.23197 3.63439 7.15962C3.99811 7.08728 4.37511 7.12441 4.71772 7.26632C5.06033 7.40824 5.35317 7.64856 5.55919 7.9569C5.76522 8.26525 5.87519 8.62776 5.87519 8.9986C5.87519 9.49588 5.67764 9.97279 5.32601 10.3244C4.97438 10.6761 4.49747 10.8736 4.00019 10.8736ZM12.7502 16.4986C12.3793 16.4986 12.0168 16.3886 11.7085 16.1826C11.4002 15.9766 11.1598 15.6837 11.0179 15.3411C10.876 14.9985 10.8389 14.6215 10.9112 14.2578C10.9836 13.8941 11.1621 13.56 11.4244 13.2978C11.6866 13.0355 12.0207 12.857 12.3844 12.7846C12.7481 12.7123 13.1251 12.7494 13.4677 12.8913C13.8103 13.0332 14.1032 13.2736 14.3092 13.5819C14.5152 13.8902 14.6252 14.2528 14.6252 14.6236C14.6252 15.1209 14.4276 15.5978 14.076 15.9494C13.7244 16.3011 13.2475 16.4986 12.7502 16.4986Z"
                      fill="#323433"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between py-2 ">
              <p className="text-xl text-[#323433] font-normal">
                {oneEvent.name}
              </p>
              <div className="flex flex-row justify-between ">
                <div className="flex items-center h-6 text-white bg-red-800  font-medium rounded-full text-xs px-2.5 text-center">
                  {oneEvent.mode}
                </div>
              </div>
            </div>
            <p className="text-l text-[#323433] font-normal mb-6">
              When and Where
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="mr-8">
                  <div className="flex flex-row">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5Z"
                        fill="#323433"
                      />
                    </svg>
                    <p className="text-sm text-[#323433] font-light mb-4 ml-2">
                      Date and Time
                    </p>
                  </div>
                  <div className="text-sm text-[#323433] font-light mb-6 ml-8">
                    <p>{format(new Date(oneEvent.date), "EEE MMM d, yyyy")}</p>
                    <p>
                      {format(
                        parse(oneEvent.start_time, "HH:mm:ss", new Date()),
                        "h:mm a"
                      )}{" "}
                      -{" "}
                      {format(
                        parse(oneEvent.end_time, "HH:mm:ss", new Date()),
                        "h:mm a"
                      )}{" "}
                      EAT
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex flex-row">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6C11.2583 6 10.5333 6.21993 9.91661 6.63199C9.29993 7.04404 8.81928 7.62971 8.53545 8.31494C8.25162 9.00016 8.17736 9.75416 8.32205 10.4816C8.46675 11.209 8.8239 11.8772 9.34835 12.4017C9.8728 12.9261 10.541 13.2833 11.2684 13.4279C11.9958 13.5726 12.7498 13.4984 13.4351 13.2145C14.1203 12.9307 14.706 12.4501 15.118 11.8334C15.5301 11.2167 15.75 10.4917 15.75 9.75C15.75 8.75544 15.3549 7.80161 14.6517 7.09835C13.9484 6.39509 12.9946 6 12 6ZM12 12C11.555 12 11.12 11.868 10.75 11.6208C10.38 11.3736 10.0916 11.0222 9.92127 10.611C9.75097 10.1999 9.70642 9.7475 9.79323 9.31105C9.88005 8.87459 10.0943 8.47368 10.409 8.15901C10.7237 7.84434 11.1246 7.63005 11.561 7.54323C11.9975 7.45642 12.4499 7.50097 12.861 7.67127C13.2722 7.84157 13.6236 8.12996 13.8708 8.49997C14.118 8.86998 14.25 9.30499 14.25 9.75C14.25 10.3467 14.0129 10.919 13.591 11.341C13.169 11.7629 12.5967 12 12 12ZM12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 12.6938 5.11031 15.8138 7.6875 18.7734C8.84552 20.1108 10.1489 21.3151 11.5734 22.3641C11.6995 22.4524 11.8498 22.4998 12.0037 22.4998C12.1577 22.4998 12.308 22.4524 12.4341 22.3641C13.856 21.3147 15.1568 20.1104 16.3125 18.7734C18.8859 15.8138 20.25 12.6938 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 20.8125C10.4503 19.5938 5.25 15.1172 5.25 9.75C5.25 7.95979 5.96116 6.2429 7.22703 4.97703C8.4929 3.71116 10.2098 3 12 3C13.7902 3 15.5071 3.71116 16.773 4.97703C18.0388 6.2429 18.75 7.95979 18.75 9.75C18.75 15.1153 13.5497 19.5938 12 20.8125Z"
                          fill="#323433"
                        />
                      </svg>
                      <p className="text-sm text-[#323433] font-light mb-4 ml-2">
                        Location
                      </p>
                    </div>
                    <div className="text-sm text-[#323433] font-light mb-6 ml-8">
                      <p>
                        {oneEvent.location}{" "}
                        {oneEvent.mode === "Physical" && `, ${oneEvent.city}`}
                      </p>
                      <p className="underline">Set reminder</p>
                    </div>
                  </div>
                  <div />
                </div>
              </div>
              <div className=" w-60">
                <p className="text-sm text-[#323433] text-center font-light mb-2">
                  This event is free
                </p>

                <Link to={oneEvent.link}>
                  <button className="flex items-center justify-center h-6 text-white bg-[#009975]  font-medium rounded-md text-xs px-2.5 text-center w-full ">
                    RSVP
                  </button>
                </Link>
                <div className="flex flex-row justify-center ">
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="29.7874"
                      height="29.8235"
                      rx="14.8937"
                      fill="white"
                    />
                    <path
                      d="M18.5371 15.8831L18.9615 13.1832H16.3471V11.4284C16.3471 10.6901 16.7121 9.96876 17.8792 9.96876H19.0846V7.66968C18.3826 7.55761 17.6734 7.49698 16.9625 7.48828C14.8107 7.48828 13.4059 8.78336 13.4059 11.1246V13.1832H11.0208V15.8831H13.4059V22.4133H16.3471V15.8831H18.5371Z"
                      fill="#4C4D4D"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.467651"
                      width="29.7874"
                      height="29.8235"
                      rx="14.8937"
                      fill="white"
                    />
                    <path
                      d="M12.8818 14.9508C12.8818 13.577 13.9934 12.4631 15.3651 12.4631C16.7368 12.4631 17.8491 13.577 17.8491 14.9508C17.8491 16.3246 16.7368 17.4385 15.3651 17.4385C13.9934 17.4385 12.8818 16.3246 12.8818 14.9508ZM11.539 14.9508C11.539 17.0672 13.2519 18.7827 15.3651 18.7827C17.4783 18.7827 19.1913 17.0672 19.1913 14.9508C19.1913 12.8344 17.4783 11.1189 15.3651 11.1189C13.2519 11.1189 11.539 12.8344 11.539 14.9508ZM18.4486 10.9669C18.4485 11.1441 18.5009 11.3172 18.5991 11.4645C18.6973 11.6118 18.8369 11.7267 19.0003 11.7945C19.1636 11.8623 19.3434 11.8802 19.5169 11.8457C19.6903 11.8112 19.8497 11.726 19.9748 11.6008C20.0999 11.4756 20.1851 11.3161 20.2197 11.1424C20.2542 10.9687 20.2366 10.7886 20.169 10.6249C20.1014 10.4613 19.9868 10.3214 19.8398 10.2229C19.6928 10.1245 19.52 10.0719 19.3431 10.0718H19.3428C19.1057 10.0719 18.8784 10.1662 18.7108 10.3341C18.5431 10.5019 18.4488 10.7295 18.4486 10.9669ZM12.3548 21.0251C11.6283 20.992 11.2335 20.8708 10.9711 20.7684C10.6232 20.6328 10.375 20.4712 10.114 20.2102C9.85301 19.9492 9.69146 19.7008 9.55663 19.3524C9.45433 19.0897 9.33332 18.6942 9.3003 17.9666C9.26418 17.18 9.25696 16.9437 9.25696 14.9509C9.25696 12.958 9.26477 12.7224 9.3003 11.9351C9.33338 11.2075 9.45529 10.8127 9.55663 10.5493C9.69206 10.2009 9.85337 9.95228 10.114 9.69092C10.3746 9.42955 10.6226 9.26776 10.9711 9.13272C11.2334 9.03028 11.6283 8.90908 12.3548 8.87601C13.1402 8.83983 13.3762 8.83261 15.3651 8.83261C17.3541 8.83261 17.5903 8.84043 18.3764 8.87601C19.1028 8.90914 19.497 9.03123 19.7601 9.13272C20.108 9.26776 20.3562 9.42991 20.6172 9.69092C20.8782 9.95193 21.0391 10.2009 21.1745 10.5493C21.2768 10.812 21.3978 11.2075 21.4309 11.9351C21.467 12.7224 21.4742 12.958 21.4742 14.9509C21.4742 16.9437 21.467 17.1793 21.4309 17.9666C21.3978 18.6942 21.2762 19.0896 21.1745 19.3524C21.0391 19.7008 20.8778 19.9494 20.6172 20.2102C20.3566 20.471 20.108 20.6328 19.7601 20.7684C19.4978 20.8708 19.1028 20.992 18.3764 21.0251C17.5909 21.0613 17.355 21.0685 15.3651 21.0685C13.3753 21.0685 13.14 21.0613 12.3548 21.0251ZM12.2931 7.53347C11.4999 7.56965 10.9578 7.69562 10.4845 7.88009C9.99423 8.0706 9.57922 8.32617 9.16451 8.74085C8.7498 9.15553 8.49526 9.57182 8.30504 10.0628C8.12085 10.5372 7.99507 11.0797 7.95894 11.8742C7.92222 12.6698 7.91382 12.9242 7.91382 14.9508C7.91382 16.9774 7.92222 17.2318 7.95894 18.0274C7.99507 18.8219 8.12085 19.3644 8.30504 19.8388C8.49526 20.3295 8.74986 20.7462 9.16451 21.1607C9.57916 21.5752 9.99423 21.8305 10.4845 22.0215C10.9587 22.206 11.4999 22.3319 12.2931 22.3681C13.088 22.4043 13.3416 22.4133 15.3651 22.4133C17.3887 22.4133 17.6427 22.4049 18.4372 22.3681C19.2305 22.3319 19.7721 22.206 20.2458 22.0215C20.7357 21.8305 21.1511 21.5754 21.5658 21.1607C21.9805 20.7461 22.2345 20.3295 22.4252 19.8388C22.6094 19.3644 22.7358 18.8219 22.7713 18.0274C22.8075 17.2312 22.8159 16.9774 22.8159 14.9508C22.8159 12.9242 22.8075 12.6698 22.7713 11.8742C22.7352 11.0797 22.6094 10.5369 22.4252 10.0628C22.2345 9.57211 21.9798 9.15618 21.5658 8.74085C21.1517 8.32552 20.7357 8.0706 20.2464 7.88009C19.7721 7.69562 19.2304 7.56906 18.4378 7.53347C17.6433 7.4973 17.3893 7.48828 15.3657 7.48828C13.3422 7.48828 13.088 7.4967 12.2931 7.53347Z"
                      fill="#4C4D4D"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.936035"
                      width="29.7874"
                      height="29.8235"
                      rx="14.8937"
                      fill="white"
                    />
                    <path
                      d="M23.2223 10.1904C22.7304 10.4026 22.2134 10.5503 21.6838 10.6299C21.9314 10.5874 22.2957 10.1408 22.4407 9.96008C22.661 9.68744 22.8288 9.37621 22.9358 9.04218C22.9358 9.01737 22.9605 8.98193 22.9358 8.96421C22.9233 8.95738 22.9093 8.95381 22.8951 8.95381C22.8809 8.95381 22.8669 8.95738 22.8544 8.96421C22.2795 9.27623 21.6675 9.51438 21.0331 9.67301C21.011 9.67978 20.9875 9.68039 20.965 9.67477C20.9426 9.66915 20.9221 9.65752 20.9058 9.64112C20.8564 9.58219 20.8032 9.52655 20.7466 9.47455C20.4879 9.24222 20.1943 9.05207 19.8766 8.91105C19.4478 8.73476 18.9847 8.65841 18.5221 8.68777C18.0733 8.71618 17.6351 8.83681 17.2348 9.04218C16.8406 9.25869 16.4941 9.55283 16.2163 9.90692C15.9239 10.2714 15.7129 10.6943 15.5974 11.1473C15.5021 11.5782 15.4912 12.0236 15.5655 12.4586C15.5655 12.5331 15.5655 12.5437 15.5019 12.5331C12.9803 12.1609 10.9114 11.2643 9.22087 9.33988C9.1466 9.25482 9.1077 9.25482 9.04757 9.33988C8.31196 10.4598 8.66916 12.2318 9.58867 13.1072C9.71245 13.2241 9.83977 13.3375 9.97416 13.4439C9.55257 13.4139 9.14128 13.2994 8.76465 13.1072C8.69391 13.0611 8.65501 13.0859 8.65148 13.171C8.64145 13.2889 8.64145 13.4075 8.65148 13.5254C8.72527 14.0905 8.94752 14.6259 9.29549 15.0767C9.64346 15.5275 10.1047 15.8776 10.632 16.0913C10.7605 16.1464 10.8944 16.188 11.0316 16.2153C10.6413 16.2923 10.241 16.3043 9.84685 16.2507C9.76197 16.233 9.73014 16.2791 9.76197 16.3606C10.2818 17.7782 11.41 18.2106 12.2376 18.4516C12.3508 18.4693 12.4639 18.4693 12.5912 18.4977C12.5912 18.4977 12.5912 18.4977 12.57 18.5189C12.326 18.9655 11.3393 19.2667 10.8866 19.4227C10.0603 19.7201 9.17939 19.8338 8.30489 19.7558C8.16696 19.7345 8.13513 19.7381 8.09977 19.7558C8.0644 19.7735 8.09977 19.8125 8.13867 19.8479C8.3155 19.9649 8.49233 20.0677 8.67623 20.1669C9.22371 20.4662 9.80251 20.7039 10.4021 20.8757C13.5072 21.7334 17.0014 21.1025 19.332 18.7812C21.164 16.9596 21.8076 14.4468 21.8076 11.9306C21.8076 11.8349 21.9243 11.7782 21.9915 11.7286C22.455 11.3667 22.8636 10.9393 23.2046 10.4598C23.2636 10.3883 23.2939 10.2973 23.2894 10.2046C23.2894 10.1515 23.2894 10.1621 23.2223 10.1904Z"
                      fill="#4C4D4D"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.212524"
                      width="29.7874"
                      height="29.8235"
                      rx="14.8937"
                      fill="white"
                    />
                    <path
                      d="M12.8705 20.9554V12.8992H10.1984V20.9554H12.8708H12.8705ZM11.535 11.7994C12.4667 11.7994 13.0467 11.1808 13.0467 10.4077C13.0292 9.61698 12.4667 9.01562 11.5527 9.01562C10.6382 9.01562 10.0409 9.61698 10.0409 10.4076C10.0409 11.1807 10.6207 11.7994 11.5175 11.7994H11.5348L11.535 11.7994ZM14.3496 20.9554H17.0215V16.4569C17.0215 16.2164 17.039 15.9754 17.1096 15.8036C17.3026 15.3223 17.7423 14.8242 18.4806 14.8242C19.4473 14.8242 19.8342 15.5629 19.8342 16.646V20.9554H22.5061V16.3362C22.5061 13.8618 21.188 12.7103 19.43 12.7103C17.9887 12.7103 17.3556 13.5176 17.0039 14.0674H17.0217V12.8994H14.3497C14.3846 13.6552 14.3495 20.9556 14.3495 20.9556L14.3496 20.9554Z"
                      fill="#4C4D4D"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p className="text-l text-[#323433] font-normal mb-6">
                About This Event
              </p>
              <p className="text-sm text-[#323433] font-light mb-6">
                {oneEvent.about}
              </p>
            </div>
            <div className="pb-6">
              <hr className="my-12 h-0.5 border divide-slate-600 " />
              <p className="text-xl text-[#323433] font-light">
                Similar Events
              </p>
              <Events events={similarEvents} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SingleEvent;