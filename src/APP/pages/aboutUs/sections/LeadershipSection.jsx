import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Caroussel } from "../../../components";
import { closeIcon } from "../../../../assets/images/icons";
import { LeadershipData } from "../data";
import { buildComm } from "../../../../assets/images/aboutPage";

function LeadershipSection() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <section className="pt-16 sm:pt-0 pb-10 mx-auto w-full max-w-screen-2xl">
      <h1 className="md:text-3xl text-2xl font-semibold title-font text-[#323433] text-center">
        Meet our leadership
      </h1>

      <Caroussel CarousselData={LeadershipData} />

      <div className="bg-[#E5EFEC] flex -mt-36 pt-40 pb-8 md:pb-24 px-4 lg:px-14 xl:px-28 justify-between flex-col md:flex-row">
        <div className="space-y-4 md:w-1/2 mb-14">
          <h2 className="text-[#009975] items-center text-xl">
            Committed to building community
          </h2>
          <h3 className=" md:text-3xl text-2xl font-semibold text-gray-900 leading-8 md:leading-10">
            We partner with like-minded organizations to build the workforce for
            Africa’s transformation.
          </h3>
          <p className="leading-6 text-base md:mr-5">
            We have narrowed our focus to do just one thing; building capacity
            in tech. We partner with individuals, organizations and public
            institutions to mentor and coach young people, between the ages of
            18-35 in the technology skills they need to build the software that
            power the world.
          </p>
          <p className="leading-6 text-base md:mr-5">
            {" "}
            We therefore focus our energies and resources on ensuring that those
            getting in a tech career, and specifically IT, are directed to the
            right resources, connected with the right people in industry for
            mentorship and connected with job opportunities where they can earn
            from their hard work.
          </p>
          <button
            className="font-semibold text-white bg-[#009975] border-0 py-3 px-8 w-full md:w-auto focus:outline-none rounded-lg text-lg"
            type="button"
            onClick={openModal}
          >
            Partner with us
          </button>

          {/* Email us Modal */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-end gap-4">
                      <button type="button" onClick={closeModal}>
                        <img
                          src={closeIcon}
                          alt="close"
                          className="object-contain w-4 h-4"
                        />
                      </button>
                      <form className="flex flex-col gap-6 w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 pl-2"
                        >
                          Write a message
                        </Dialog.Title>

                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            placeholder="Your name"
                            className="w-full outline-none text-base placeholder:text-gray-600 border border-[#79747E] rounded-[4px] pl-4 py-2"
                          />
                          <input
                            type="email"
                            placeholder="Your email"
                            className="w-full outline-none text-base placeholder:text-gray-600 border border-[#79747E] rounded-[4px] pl-4 py-2"
                          />
                          <textarea
                            cols="30"
                            rows="10"
                            placeholder="Your name"
                            className="w-full outline-none text-base placeholder:text-gray-600 border border-[#79747E] rounded-[4px] pl-4 py-2"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-fit inline-flex justify-center rounded-lg border border-transparent bg-[#009975] px-6 py-3 text-base font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Send message
                        </button>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        <div className="md:w-1/2">
          <img src={buildComm} alt="Space ya Tech Community" />
        </div>
      </div>
    </section>
  );
}

export default LeadershipSection;
