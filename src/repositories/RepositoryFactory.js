import _userRepository from "./userRepository";
import _catalogRepository from "./catalogRepository";
import _subsidiaryRepository from "./subsidiariesRepository";
import _companyRepository from "./companiesRepository";
import _projectRepository from "./projectsRepository";
import _customerRepository from "./customersRepository";
import _contactRepository from "./contactsRepository";
import _projectManagerRepository from "./projectManagersRepository";
import _projectHourBankRepository from "./projectHourBanksRepository";
import _hourBankRepository from "./hourBanksRepository";
import _projectResourceRepository from "./projectResourcesRepository";
import _taskActivityRepository from "./taskActivitiiesRepository";
import _projectTaskRepository from "./projectTasksRepository";
import _employeeRepository from "./employeesRepository";
import _employeeAwardRepository from "./employeeAwardsRepository";
import _employeeCertificationRepository from "./employeeCertificationsRepository";
import _employeeExperienceRepository from "./employeeExperiencesRepository";
import _employeeSkillAbilityRepository from "./employeeSkillAbilitiesRepository";
import _employeeStudyRepository from "./employeeStudiesRepository";
import _projectReportRepository from "./projectsReportRepository";
import _projectReportActivitiesRepository from "./projectsReportActivitiesRepository";
import _projectReportDetailRepository from "./projectsReportDetailsRepository";
import _financialParticipationRepository from "./financialParticipationRepository";
import _productivityParticipationTableRepository from "./productivityParticipationTableRepository";
import _authenticateRepository from "./authenticateRepository";

const repositories = {
  users: _userRepository,
  catalogs: _catalogRepository,
  subsidiaries: _subsidiaryRepository,
  companies: _companyRepository,
  projects: _projectRepository,
  customers: _customerRepository,
  contacts: _contactRepository,
  projectManagers: _projectManagerRepository,
  projectHourBanks: _projectHourBankRepository,
  hourBanks: _hourBankRepository,
  projectResources: _projectResourceRepository,
  taskActivities: _taskActivityRepository,
  projectTasks: _projectTaskRepository,
  employees: _employeeRepository,
  employeeAwards: _employeeAwardRepository,
  employeeCertifications: _employeeCertificationRepository,
  employeeExperiences: _employeeExperienceRepository,
  employeeSkillAbilities: _employeeSkillAbilityRepository,
  employeeStudies: _employeeStudyRepository,
  projectReport: _projectReportRepository,
  projectReportActivities: _projectReportActivitiesRepository,
  projectReportDetail: _projectReportDetailRepository,
  financialParticipation: _financialParticipationRepository,
  productivityTable: _productivityParticipationTableRepository,
  authenticate: _authenticateRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
