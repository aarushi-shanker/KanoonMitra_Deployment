import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { setClause, addClause, removeClause } from '../../../redux/features/documentFormSlice'

const DocumentInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const clauses = useSelector((state) => state.form.clauses);

  const handleClauseChange = (index, value) => {
    dispatch(setClause({ index, value }));
  };

  const handleAddClause = () => {
    dispatch(addClause());
  };

  const handleRemoveClause = (index) => {
    dispatch(removeClause(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/documentPage/${params.name}`)
  };

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content w-full">
        <form onSubmit={handleSubmit} className="w-full mt-4">
          <div className='w-full'>
            <label>
              IMPORTANT CLAUSES TO INCLUDE:
              {clauses?.map((clause, index) => (
                <div key={index} className="flex flex-col gap-2 mt-1">
                  <input
                    type="text"
                    value={clause}
                    onChange={(e) => handleClauseChange(index, e.target.value)}
                    className="block border p-2"
                    required
                  />
                  {index > 0 &&
                    <button type="button" onClick={() => handleRemoveClause(index)} className="ml-2 btn btn-danger w-40">
                      Remove Clause
                    </button>
                  }
                </div>
              ))}
            </label>
            <button type="button" onClick={handleAddClause} className="mt-2 ml-2 btn bg-green-700 text-white w-40">
              Add Clause
            </button>
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="btn px-2.5 bg-blue-700 text-white mt-4">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentInput