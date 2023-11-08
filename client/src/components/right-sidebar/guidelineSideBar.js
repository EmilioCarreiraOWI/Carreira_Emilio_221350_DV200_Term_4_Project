import React from 'react';

// Bootstrap
import Button from 'react-bootstrap/Button';

// Components

function GuidelineSideBar() {

  let guidelines = {
    title: 'New post guidelines',
    guidelines: [
      'Be nice',
      'Be respectful',
      'Be helpful',
      'Be awesome',
      'Read the community guidelines'
    ]
  }

  return (
    <>
      <div className="dark-rounded-container p-20 text-start mt-20">
        <h2 className="text-xlarge mb-4">{guidelines.title}</h2>

        {guidelines.guidelines.map((guideline, index) => {
          const parts = guideline.split('community guidelines');
          return (
            <p key={index} className='text-medium light-grey mb-2'>
              {parts.map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                  {partIndex > 0 ? (
                    <a href="your-link-here" className='yellow no-text-decoration'>community guidelines</a>
                  ) : null}
                  {`${partIndex > 0 ? '' : index + 1}. ${part}`}
                </React.Fragment>
              ))}
            </p>
          );
        })}

      </div>
    </>
  );
}

export default GuidelineSideBar;