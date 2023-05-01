import React from "react";

const CategoryModal = (props) => (
  <div className="modal fade" id="categoryModal" tabIndex="-1" role="dialog" aria-labelledby="categoryModal"
    aria-hidden="true">
    <div className="modal-dialog modal-sm" role="document">
      <div className="modal-content border-0 shadow">
        <div className="modal-header bg-light border-dark">
          <h5 className="modal-title text-dark" id="exampleModalLabel">
            Create New Category
          </h5>
          <button type="button" className="close text-dark" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body bg-white border-dark text-dark">
          <div className="row mb-2">
              <div className="col-12">
                  <label>Category Title</label>
                  <div className="input-group input-group-md">
                      <input name="CategoryTitleModal" type="text"
                          className="form-control bg-white border-dark text-dark"
                          value={props.categoryName}
                          onChange={(event)=>props.setCategoryName(event.target.value.replace(/[^\w\s]/gi, ""))}
                          maxLength="100" />
                  </div>
              </div>
          </div>
        </div>
        <div className="modal-footer bg-light border-dark">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" onClick={props.addNewCategory} className="btn btn-info" data-dismiss="modal">
            Add Category
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryModal;
