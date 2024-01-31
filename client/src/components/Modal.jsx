import React from "react";

export default function Modal(props) {
    const [showModal, setShowModal] = React.useState(props.showModal);
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                {props.mbti && <p><b>MBTI:</b> {props?.mbti}</p>}
                                <br />
                                {props.personality && <p><b>Description: </b>{props?.personality?.description}</p>}
                                {props?.personality?.traits.map((trait, index) => {
                                    return(
                                        <p key={index}><b>Trait no: {index+1} :</b> {trait}</p>
                                    )
                                })}
                                <p>{props.totalScore != undefined && <><b>TotalScore: </b>{props?.totalScore}</>}</p>
                                <p>{props.guidance && <><b>Guidance: </b>{props?.guidance}</>}</p>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}