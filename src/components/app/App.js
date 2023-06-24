import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spiner";

const Page404 = lazy(() => import('../pages/404'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/SingleCharacterLayout/SingleCharacterLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {

	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>
					<Suspense fallback={<Spinner/>}>
						<Switch>
							<Route exact path="/">
								<MainPage/>
							</Route>
							<Route exact path="/comics">
								<ComicsPage/>
							</Route>
							<Route exact path="/comics/:id">
								<SinglePage Component={SingleComicLayout} dataType={'comic'}/>
							</Route>
							<Route exact path="/characters/:id">
								<SinglePage Component={SingleCharacterLayout} dataType={'character'}/>
							</Route>
							<Route path="*">
								<Page404/>
							</Route>
						</Switch>
					</Suspense>
				</main>
			</div>
		</Router>
	);
}

export default App;
