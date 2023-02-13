import ExplorePage from "./Explore/ExplorePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Nav";
import { UnapprovedVenues } from "./Admin/UnapprovedVenues";
import { CategoriesList } from "./Admin/CategoriesList";
import { LocalReviews } from "./Explore/LocalReviews"
import RequestList from "./Request/RequestList";
import { useGetTokenQuery } from './store/authApi'

function App() {
  const { data: tokenData, isLoading} = useGetTokenQuery();
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.account.is_admin === true) {
    return (
      <BrowserRouter basename={basename}>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/trending" element={<LocalReviews />} />
            <Route path="/request" element={<RequestList />} />
            <Route path="/unapproved" element={<UnapprovedVenues />} />
            <Route path="/categories" element={<CategoriesList />} />
          </Routes>
        </div>
      </BrowserRouter>
    );

  } else {
    return (
      <BrowserRouter basename={basename}>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/trending" element={<LocalReviews />} />
            <Route path="/request" element={<RequestList />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
