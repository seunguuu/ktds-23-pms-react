import React, { useEffect, useRef, useState } from "react";
import styles from "../project.module.css";
import TextInput from "../../common/input/TextInput";
import Selectbox from "../../common/selectbox/Selectbox";
import SelectDate from "../../common/selectbox/SelectDate";
import Button from "../../common/Button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CreateProjectApp = () => {
  const prjNameRef = useRef();
  // const [prjName, setPrjName] = useState("");
  const prjMemoRef = useRef();

  const startDateRef = useRef();
  const endDateRef = useRef();

  const [clientData, setClientData] = useState([]);
  const [clientSelectedData, setClientSelectedData] =
    useState("고객사를 선택해주세요.");

  const [deptData, setDeptData] = useState([]);
  const [deptSelectedData, setDeptSelectedData] =
    useState("부서를 선택해주세요.");

  const [pmCandidate, setPmCandidate] = useState([]);
  const [pmSelectedData, setPmSelectedData] = useState("PM을 선택해주세요");

  const tokenInfo = useSelector((state) => {
    return {
      token: state.tokenInfo.token,
      credentialsExpired: state.tokenInfo.credentialsExpired,
    };
  });

  useEffect(() => {
    const getClient = async () => {
      const response = await fetch("http://localhost:8080/api/project/client", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      let list = [];
      for (let i = 0; i < json.body.length; i++) {
        list.push({ label: json.body[i].clntName, value: json.body[i].clntId });
      }
      setClientData(list);
      return json;
    };
    getClient();
  }, [tokenInfo.token]);
  useEffect(() => {
    const getDept = async () => {
      const response = await fetch("http://localhost:8080/api/v1/department", {
        headers: { Authorization: tokenInfo.token },
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      let list = [];
      for (let i = 0; i < json.body.length; i++) {
        list.push({ label: json.body[i].deptName, value: json.body[i].deptId });
      }
      setDeptData(list);
      return json;
    };
    getDept();
  }, [tokenInfo.token]);

  const onChangeFn = async () => {
    console.log(deptSelectedData, "~~~");
    if (deptSelectedData !== null) {
      const response = await fetch(
        `http://localhost:8080/api/project/employee/findbydeptid/${deptSelectedData}`,
        { headers: { Authorization: tokenInfo.token }, method: "GET" }
      );
      const json = await response.json();
      console.log(json);
      let list = [];
      for (let i = 0; i < json.body.length; i++) {
        list.push({ label: json.body[i].empName, value: json.body[i].empId });
      }
      setPmCandidate(list);
      return json;
    }
  };

  const onChangeSelect = () => {
    if (
      startDateRef.current &&
      endDateRef.current &&
      startDateRef.current > endDateRef.current
    ) {
      alert("시작일이 끝 날짜보다 클 수 없습니다.");
    }
  };
  const navigate = useNavigate();
  const onClickCreateButtonHandler = async () => {
    const response = await fetch("http://localhost:8080/api/project/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenInfo.token,
      },
      body: JSON.stringify({
        prjName: prjNameRef.current.value,
        clntInfo: clientSelectedData,
        deptId: deptSelectedData,
        pmId: pmSelectedData,
        strtDt: startDateRef.current,
        endDt: endDateRef.current,
        prjMemo: prjMemoRef.current.value,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status === 200) {
      alert("프로젝트 생성에 성공했습니다.");
      navigate("/project");
    }
  };

  return (
    <div className={styles.createContainer}>
      <h3 className={styles.createAndModify}>프로젝트 생성</h3>
      <div className={styles.createGrid}>
        <div>프로젝트명</div>
        <div>
          <TextInput id="prjName" ref={prjNameRef} />
        </div>
        <div>고객사</div>
        <div>
          <Selectbox
            optionList={clientData}
            setSelectedData={setClientSelectedData}
            selectedData={clientSelectedData}
          />
        </div>
        <div>부서</div>
        <div>
          <Selectbox
            optionList={deptData}
            setSelectedData={setDeptSelectedData}
            selectedData={deptSelectedData}
            onChangeFn={onChangeFn}
          />
        </div>
        <div>Project Manage</div>
        <div>
          <Selectbox
            optionList={pmCandidate}
            setSelectedData={setPmSelectedData}
            selectedData={pmSelectedData}
          />
        </div>
        <div>프로젝트 기간</div>
        <div>
          <SelectDate
            onChangeSelect={onChangeSelect}
            startDateRef={startDateRef}
            endDateRef={endDateRef}
          />
        </div>
        <div>Project Readme</div>
        <div className={styles.contentBoxContainer}>
          <textarea
            className={styles.contentBox}
            inputId="prjMemo"
            ref={prjMemoRef}
          ></textarea>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button onClickHandler={onClickCreateButtonHandler}>생성</Button>
      </div>
    </div>
  );
};

export default CreateProjectApp;
