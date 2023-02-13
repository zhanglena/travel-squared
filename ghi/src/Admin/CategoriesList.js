import Table from "react-bootstrap/Table";
import { useGetCategoriesQuery } from "../store/adminApi";
import { AddCategoryModal } from "./AddCategoryModal";
import "./Admin.css";

export function CategoriesList() {
  const { data: categoriesData, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
    <>
      <div className="container padding" style={{ mt: "5rem" }}>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <h3>
                There are currently {categoriesData.length} categories
                available.
              </h3>
              <AddCategoryModal />
              <Table
                striped
                bordered
                variant="dark"
                style={{ marginTop: "20px" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesData.map((category) => {
                    return (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.category_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
