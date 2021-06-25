import React from "react"
import "./index.css"


export const HomeSkeleton = ()=>{
    return (
        <div className="skeleton">
            <div className="details">
                <h3 aria-hidden="true" className="loadings"></h3>
                <ul className="loadings"></ul>
                <div className="reviews loadings"></div>
            </div>
        </div>
    )
}

export  const ResultSkeleton = ()=>{
    return (
        <div className="result-skeleton">
            <div className="result-house loading"></div>
            <div className="result-description">
                <h3 aria-hidden="true" className="loadings"></h3>
                <h4 aria-hidden="true" className="loadings"></h4>
                <p className="loadings"></p>
                <ul className="loadings"></ul>
            </div>
            <div className="result-third">
                <div className="result-verified-house loadings"></div>
                <div className="result-house-price loadings"></div>
            </div>
        </div>
    )
}


export const SinglePageSkeleton = ({related})=>{
    return (
        <div className="single-skeleton header-wrap">
        <div className="label">
            <div className="breadcumb"></div>
        </div>
        <div className="single-details">
            <div className="col">
                <div className="featured">
                    <div className="slide loading">
                        <div className="slide-overlay">
                        </div>
                    </div>
                    <div className="side">
                        <div className="sicons"></div>
                        <div className="sicons"></div>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="single-info">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul className="details-accessories">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="description">
            <div className="nav">
                <ul>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="main">
                <div className="main-inner">
                    <h3 aria-hidden="true"></h3>
                    <p></p>
                    <h3 aria-hidden="true"></h3>
                    <table>
                    </table>
                </div>
            </div>
        </div>
        <div className="similiar main-inner">
            <h3 aria-hidden="true"></h3>
            <p></p>
            <p></p>
            {related?(
                <>
                <h3 aria-hidden="true" className="title"></h3>
                <section id="filter-results" className="related" >
                    <div className="col">
                        {[...Array(2)].map((item,index)=>{
                            return (
                                <ResultSkeleton key={index} />
                            )
                        })}
                    </div>
                    <div className="adverts">
                        <div className="ad1">
                            <div className="advert-overlay"></div>
                        </div>
                        <div className="ad2">
                            <div className="advert-overlay"></div>
                        </div>
                    </div>
                </section>
                </>
            ):''}
        </div>
    </div>
    )
}