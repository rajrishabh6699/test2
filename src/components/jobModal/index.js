import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseIcon from '../../images/close-icon.svg';
import EmptyIcon from '../../images/curriculum.svg'

export const AuthToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNxdWFyZWJvYXRAZ21haWwuY29tIiwibmFtZSI6IlJlY3J1aXRlciIsInNraWxscyI6InB5dGhvbiIsInVzZXJSb2xlIjowLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTIyVDEwOjUxOjEzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTIyVDExOjEwOjAyLjAwMFoiLCJpZCI6IjFmMmEzNjYxLTFjM2QtNGIwZi04ZWM0LTE5ZjUzM2ZiOTBmMiIsImlhdCI6MTY0NTQzOTg3M30.xKo_bIJKoCbYDRdcrMKEBv0_Qjt9q2kFqwSBcMK0Jwo';

const JobModal = ({ modalState, setModalState }) => {
  const [candidatesData, setCandidatesData] = useState(null);

  const getJobCandidates = async jobId => {
    try {
      const {
        data: { data, success }
      } = await axios.get(
        `https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${jobId}/candidates`,
        {
          headers: {
            Authorization: AuthToken
          }
        }
      );
      if (success) return data;
    } catch (error) {
      console.error('error fetching candidates data: ', error);
    }
  };

  useEffect(() => {
    if (modalState.jobId) {
      document.body.style.overflow = 'hidden';
      getJobCandidates(modalState.jobId).then(data => setCandidatesData(data));
    }
  }, [modalState.jobId]);
  return (
    <>
      <div style={{ width: '100%', height: '80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-betweeen',
            width: '100%',
            borderBottom: '1px solid  gray',
            margin:'0 0  11px 0'
          }}
        >
          <p style={{ width: '100%', height: '15px' ,fontFamily:'Helvetica Neue, Medium',fontSize:'24px',paddingBottom:'35px',fontWeight:'500'}}>Applicants for this job</p>
          <img
            style={{ cursor: 'pointer', height: '15px' }}
            src={CloseIcon}
            onClick={() => {
              document.body.style.overflow = 'auto';
              setModalState({ show: false, jobId: null });
            }}
          />
        </div>
        <p style={{width: '100%', height: '15px' ,fontFamily:'Helvetica Neue, Normal',fontSize:'16px'}}>Total {candidatesData?.length??0} application</p>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          background: '#EEEFF2',
          borderRadius: '10px',
          overflow: 'auto',
          height: 'calc(100% - 80px)'
        }}
      >
        {candidatesData ? candidatesData.map(candidate => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '14px',
              border: '1px solid #303F6080',
              borderRadius: '5px',
              width: '46%',
              margin: '12px',
              background: 'white',
              height: '159px',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '14px',
                border: '1px solid #303F6080',
                borderRadius: '5px',
                width: '46%',
                margin: '12px',
                background: 'white',
                height: '179px',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  borderRadius: '100%',
                  minWidth: '20%',
                  width: '50px',
                  height: '50px',
                  background: '#D9EFFF'
                }}
              >
                <p style={{ margin: '14px 20px' }}>{candidate.name[0].toUpperCase()}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 0 0 20px',
                  width: '80%'
                }}
              >
                <p style={{}}>{candidate.name}</p>
                <p
                  style={{
                    fontSize: '15px',
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflowX: 'clip'
                  }}
                >
                  {candidate.email}
                </p>
              </div>
            </div>
            <p>Skills</p>
            <p style={{ width: '100%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {candidate.skills}
            </p>
          </div>
        )) : 
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <img src={EmptyIcon} />
        <p style={{ margin: '20px 0 0 0', color: '#303F60' }}>
          No applications available.
        </p>
      </div>
        }
      </div>
    </>
  );
};

export default JobModal;
