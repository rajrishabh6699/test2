import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Header from "../../components/Header";
import JobCard from "../../components/jobCard";
import { getJobs } from "./jobDetailsPage.utils";
import { customStyles } from "./jobDetailsPage.constants";
import HomeIcon from "./home-icon.svg";
import EmptyIcon from '../../images/writing.svg';
import JobModal from "../../components/jobModal";
import classes from "./DetailsPage.module.css";

const JobDetailsPage = () => {
  const [modalState, setModalState] = useState({
    show: false,
    jobId: null,
  });
  const [jobsData, setJobsData] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  const closeModal = () =>
    setModalState({
      show: false,
      jobId: null,
    });

  useEffect(() => {
    getJobs(pageCount).then((data) => setJobsData(data));
  }, [pageCount]);

  return (
    <>
      <div className={classes.container}>
        <Header />
        <div style={{ borderTop: "1px solid white", margin: "22px 0 0 0" }}>
          <div className={classes.main}>
            <img src={HomeIcon} height="15px"></img>
            <p
              style={{ color: "white", fontSize: "15px", margin: "0 0 0 8px" }}
            >
              Home
            </p>
          </div>
          <p
            style={{
              color: "white",
              margin: "24px 0 -20px 60px",
              fontSize: "22px",
              paddingTop:'40px'
            }}
          >
            Jobs posted by You
          </p>
        </div>
      </div>

      <div className={classes.box}>
        <div className={classes.innerBox}>
          {jobsData ? (
            jobsData.map((job) => (
              <JobCard
                jobData={job}
                key={job.id}
                setModalState={setModalState}
              />
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: 'calc(100vh - 310px)',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 150px 0 0'
              }}
            >
              <img src={EmptyIcon} />
              <p style={{ margin: '20px 0 0 0', color: '#303F60' }}>
                Your posted jobs will show here.
              </p>
              <button
                style={{
                  background: '#43AFFF',
                  width: '148px',
                  padding: '13px 34px 14px 34px',
                  border: '1px solid #43AFFF',
                  borderRadius: '5px',
                  color: '#FFFFFF',
                  margin: '40px 0 0 0 '
                }}
              >
                Post a Job
              </button>
            </div>
          )}
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <p
            style={{
              cursor: pageCount == 1 ? "not-allowed" : "pointer",
              border: "solid black",
              borderWidth: "3px 3px 3px 3px",
              display: "inline-block",
              padding: "3px",
            }}
            onClick={() => pageCount >= 2 && setPageCount(pageCount - 1)}
          >Previous</p>
          <p style={{ margin: "0 12px" }}>{pageCount}</p>
          <p
            style={{ cursor: "pointer" ,
            border: "solid black",
            borderWidth: "3px 3px 3px 3px",
            display: "inline-block",
            padding: "3px",}}
            onClick={() => setPageCount(pageCount + 1)}
          >
            Next
          </p>
        </div>
      </div>

      {modalState.show && (
        <Modal
          isOpen={modalState.show}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <JobModal modalState={modalState} setModalState={setModalState} />
        </Modal>
      )}
    </>
  );
};

export default JobDetailsPage;
