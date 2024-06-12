import React from 'react'

const GenderCheckbox = ({ onCheckboxChange, selectedGender })=> {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender} === "male ? "selectedGender" : ""`}>
          <span className='label-text text-black'>Мужчина</span>
        </label>
        <input type="checkbox" className="checkbox border-slate-900" 
        checked={selectedGender === "male"}
        onChange={() => onCheckboxChange("male")}
        />
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender} === "female ? "selectedGender" : ""`}>
          <span className='label-text text-black'>Женщина</span>
        </label>
        <input type="checkbox" className="checkbox border-slate-900" 
        checked={selectedGender === "female"}
        onChange={() => onCheckboxChange("female")}
        />
      </div>
    </div>
  )
}

export default GenderCheckbox