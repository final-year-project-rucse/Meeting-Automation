import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CreateResolution = () => {
  const params = useParams();
  const navigation = useNavigate();

  const [resolutions, setResolutions] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [agendaLoading, setAgendaLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setAgendaLoading(true);
    axios
      .get(`/${params.meetingName}/meetings/${params.meetingId}`)
      .then((res) => {
        const copyAgendas = [...res.data.data[0].agendas];
        const newCopy = copyAgendas.map((el) => {
          return {
            ...el,
            resolution: [],
          };
        });
        setAgendas(newCopy);
        setAgendaLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setAgendaLoading(false);
      });
  }, []);

  const resolutionHandler = (agendaNo) => {
    const agendaCopy = [...agendas];
    let singleAGenda = agendaCopy[agendaNo];
    let resolutionCopy = [...singleAGenda.resolution];
    const singleResolution = { title: "" };
    resolutionCopy.push(singleResolution);
    singleAGenda.resolution = resolutionCopy;

    setAgendas(agendaCopy);
  };

  const checkHandler = () => {
    setSubmitLoading(true);
    let resolution = [];
    const copyAgendas = [...agendas];
    for (let i = 0; i < copyAgendas.length; i++) {
      for (let j = 0; j < copyAgendas[i].resolution.length; j++) {
        let reso = {
          title: `${copyAgendas[i].text} RAKIBBEPULEBRAHIM ${copyAgendas[i].resolution[j].title}`,
        };
        resolution.push(reso);
      }
    }

    let finalObj = {
      resolutions: resolution,
    };
    console.log(finalObj);
    axios
      .post(
        `/${params.meetingName}/meetings/${params.meetingId}/addResolution`,
        finalObj
      )
      .then((res) => {
        navigation(
          `/${params.meetingName}/meetings/${params.meetingId}/resolution`
        );
        setSubmitLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setSubmitLoading(false);
        console.log(err.response);
      });

    console.log(resolution);
  };

  const inputHandler = (e, index, i) => {
    const copyAgendas = [...agendas];
    const singleAGenda = copyAgendas[index];
    const copyResolution = [...singleAGenda.resolution];
    let temp = copyResolution[i];
    temp.title = e.target.value;
    copyResolution[i] = temp;
    setAgendas(copyAgendas);
  };
  const addNewResolutionHandler = () => {
    const singleResolution = { title: "" };
    const copyResolution = [...resolutions];
    copyResolution.push(singleResolution);
    setResolutions(copyResolution);
  };

  const deleteResolution = (position) => {
    const copyResolution = [...resolutions];
    copyResolution.splice(position, 1);
    setResolutions(copyResolution);
  };

  return (
    <div className="container-md m-5">
      <p className="h2 text-center pb-4">Add Resolution</p>
      {agendaLoading ? (
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
          {agendas.map((el, i) => (
            <div key={el._id}>
              <div className="row mt-3">
                <div className="col-auto">
                  <span className="h5"> Agenda {i + 1} :</span>
                </div>
                <div className="col">
                  <p className="ms-2">
                    {el.text}
                    <button
                      className="btn btn-primary btn-sm ms-4"
                      onClick={() => resolutionHandler(i)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </p>
                </div>
              </div>
              {el.resolution.map((item, deepi) => (
                <div className="container" key={deepi}>
                  <div className="row mt-4">
                    <div className="col ">
                      <label className="form-label">
                        Resolution : {deepi + 1}
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        type="text"
                        name="text"
                        value={item.text}
                        placeholder={`Resolution for ${
                          el.text.length > 30
                            ? `${el.text.substring(0, 29)}....`
                            : el.text
                        }`}
                        onChange={(e) => inputHandler(e, i, deepi)}
                      ></textarea>
                    </div>
                    <div className="col-auto ">
                      <button className="btn btn-danger me-3  btn-sm">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {resolutions.map((el, i) => (
            <div key={i}>
              <input
                placeholder="Resolution"
                name="title"
                value={el.title}
                onChange={(e) => inputHandler(e, i)}
              />
              <button onClick={() => deleteResolution(i)}>Delete</button>
            </div>
          ))}
          <br></br>
          <button className="btn btn-primary" onClick={checkHandler}>
            {submitLoading && (
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default CreateResolution;
