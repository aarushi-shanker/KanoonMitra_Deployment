import React from 'react'
import { useParams } from 'react-router-dom';
import { MdDownloadForOffline } from "react-icons/md";
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon } from 'react-share';

const DocHeader = ({ handlePrint }) => {
  const params = useParams();
  const title = params.name;
  const shareUrl = 'https://www.pakkamarwadi.tk/';

  return (
    <div className="p-4">
      <div className='flex md:justify-between flex-col md:flex-row items-center'>
        <div><h2 className="md:text-2xl text-lg font-bold">{title}</h2></div>
        <div className="flex space-x-2 my-4">
          <button
            className="text-red-700 text-center"
            onClick={handlePrint}>
            <MdDownloadForOffline size={45} />
          </button>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            hashtag={`#${title}...`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={shareUrl}
            quote={title}
            hashtag={`#${title}...`}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
      <div className='text-xs text-red-600 font-semibold mx-5'>
        <p className="mt-2">IMPORTANT: This is only a suggested format of {title}.</p>
        <p className="mt-2">
          For customized and specific inputs, you can contact us for online drafting based on your inputs.
        </p>
        <p className="mt-2">
          The {title} is required to be typed on stamp paper of appropriate value as required by the state government.
        </p>
        <p className="mt-2">
          The format is to be duly signed by the parties at appropriate places with proof of their identity mentioned on the format.
        </p>
        <p className="mt-2">
          This {title} can be downloaded free and modified for contingent and urgent requirements.
        </p>
      </div>
    </div>
  );
};

export default DocHeader