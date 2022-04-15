import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useParams, Link } from "react-router-dom";
import {jsPDF} from 'jspdf'
// import 'assets/fonts/SolaimanLipi-normal.js';

const resolutionMap = new Map();

const AllResolutions = () => {
  const params = useParams();
  const [allResolutions, setAllResolutions] = useState([]);
  const [tempResolution, setTempResolution] = useState(resolutionMap);
  const [loading, setLoading] = useState(false);

  const getAllResolutionHanlder = (resolutions) => {
    axios
      .get(`/${params.meetingName}/meetings/${params.meetingId}/resolutions`)
      .then((res) => {
        const resolution = res.data.data;
        for (let i = 0; i < resolution.length; i++) {
          const splitResolution =
            resolution[i].title.split("RAKIBBEPULEBRAHIM");
          const key = splitResolution[0].substring(
            0,
            splitResolution[0].length - 1
          );
          let value = resolutions.get(`${key}`);
          value.push(splitResolution[1]);
          resolutions.set(key, value);
        }
        let newResolution = [];
        resolutions.forEach((value, key) => {
          const tmpObj = {
            agenda: key,
            resolution: value,
          };
          newResolution.push(tmpObj);
        });
        setTempResolution(resolutions);
        setAllResolutions(newResolution);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    let resolutions = new Map();
    axios
      .get(`/${params.meetingName}/meetings/${params.meetingId}`)
      .then((res) => {
        console.log(res.data.data[0].agendas);
        const agenda = res.data.data[0].agendas;
        for (let i = 0; i < agenda.length; i++) {
          resolutions.set(`${agenda[i].text}`, []);
        }
        getAllResolutionHanlder(resolutions);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const generatePdfHandler =() => {
    console.log(allResolutions)
    const doc = new jsPDF();
    // doc.setFont('SolaimanLipi');
    doc.setFontSize(10); // set font size 10
  // doc.text('মাইক্রোসফট আফিস ট্রেনিং গাইড', 10, 10)
    let position = 10;
    for(let i = 0;i<allResolutions.length;i++) {
      doc.setFontSize(10)
      doc.text(`${allResolutions[i].agenda}`, 10, position);
      for(let j=0;j<allResolutions[i].resolution.length;j++) {
        doc.text(`${allResolutions[i].resolution[j]}`, 10, position+=10);
      }
    }
    
    doc.save("a4.pdf");
  }

  // useEffect(() => [getAllResolutionHanlder()], []);
  return (
    <div className="container-md m-5">
      <div>
        <h4 className="h2 text-center">Resolution</h4>
        <button onClick={generatePdfHandler}>Generate Pdf</button>
        {loading ? (
          <div
            class="d-flex justify-content-center"
            style={{ marginTop: "30vh" }}
          >
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {allResolutions.map((el, i) => (
              <div kei={i}>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-auto">
                      <span className="h5 ">Agenda :</span>
                    </div>
                    <div className="col">
                      <p>{el.agenda}</p>
                    </div>
                  </div>
                </div>
                <div className="mx-2">
                  {el.resolution.map((reso, idx) => (
                    <div classname="container " key={100 * i + idx + 5000}>
                      <div className="row ms-4 pt-3">
                        <div className="col-auto">
                          <span className="h6 ">Resolution: </span>
                        </div>
                        <div className="col">
                          <p>{reso}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllResolutions;
