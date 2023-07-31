import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		errorElement: <Error />
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <h1>HAHAHAHA</h1>
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App
