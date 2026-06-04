import { createBrowserRouter, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RoleSelection from './pages/RoleSelection';
import ShelterSignup from './pages/ShelterSignup';
import AdopterSignup from './pages/adopter/AdopterSignup';
import ShelterLayout from './pages/shelter/ShelterLayout';
import ShelterDashboard from './pages/shelter/ShelterDashboard';
import IntakeFlow from './pages/shelter/IntakeFlow';
import BatchOnboarding from './pages/shelter/BatchOnboarding';
import OuttakeFlow from './pages/shelter/OuttakeFlow';
import MedicalHistory from './pages/shelter/MedicalHistory';
import ActivityLog from './pages/shelter/ActivityLog';
import ApplicationTracker from './pages/shelter/ApplicationTracker';
import AdopterLayout from './pages/adopter/AdopterLayout';
import ExploreAnimals from './pages/adopter/ExploreAnimals';
import AnimalProfile from './pages/adopter/AnimalProfile';
import AdopterProfile from './pages/adopter/AdopterProfile';
import PreferenceQuiz from './pages/adopter/PreferenceQuiz';
import AdoptionReadiness from './pages/adopter/AdoptionReadiness';

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/login', Component: LoginPage },
  { path: '/get-started', Component: RoleSelection },
  { path: '/shelter/signup', Component: ShelterSignup },
  { path: '/adopter/signup', Component: AdopterSignup },
  { path: '/explore', Component: ExploreAnimals },
  { path: '/adopter/explore', element: <Navigate to="/explore" replace /> },
  {
    path: '/shelter',
    Component: ShelterLayout,
    children: [
      { index: true, element: <Navigate to="/shelter/dashboard" replace /> },
      { path: 'dashboard', Component: ShelterDashboard },
      { path: 'intake', Component: IntakeFlow },
      { path: 'batch', Component: BatchOnboarding },
      { path: 'outtake', Component: OuttakeFlow },
      { path: 'medical', Component: MedicalHistory },
      { path: 'activity', Component: ActivityLog },
      { path: 'applications', Component: ApplicationTracker },
    ],
  },
  {
    path: '/adopter',
    Component: AdopterLayout,
    children: [
      { index: true, element: <Navigate to="/explore" replace /> },
      { path: 'animal/:id', Component: AnimalProfile },
      { path: 'profile', Component: AdopterProfile },
      { path: 'preferences', Component: PreferenceQuiz },
      { path: 'adoption', Component: AdoptionReadiness },
      { path: 'favourites', element: <Navigate to="/explore" replace /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
