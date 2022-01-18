import React, { useState } from "react";

export function Card() {
  return (
    <>
      <div>
        <button>Save</button>
      </div>
      <div className="main">
        <div className="left-flex-container">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Comments" />
        </div>
        <div>
            <input type="text" placeholder="Activity Specifications" />
        </div>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </>
  );
}
