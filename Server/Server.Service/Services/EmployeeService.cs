using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _employeeRepository.GetEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            ValidateEmployee(employee);
            return await _employeeRepository.AddEmployeeAsync(employee);
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            ValidateEmployee(employee);
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        }

        public void DeleteEmployeeAsync(int id)
        {
            _employeeRepository.DeleteEmployeeAsync(id);
        }

        private static void ValidateEmployee(Employee employee)
        {
            if (!ValidateIsraeliID(employee.EmployeeIdentification))
                throw new Exception("The identification number is not valid!");
            if (employee.StartDate < employee.BirthDate)
                throw new Exception("The start date is before the birth date!");
            employee.Roles.ForEach(r =>
            {
                if (r.StartDate < employee.StartDate)
                    throw new Exception("The start date of the role is before the start date in the job!");
            });
        }

        private static bool ValidateIsraeliID(string id)
        {
            if (id.Length != 9)
                return false;
            if (!int.TryParse(id, out int number))
                return false;
            int sum = 0;
            for (int i = 0; i < 9; i++)
            {
                int digit = int.Parse(id[i].ToString());
                int weight = (i % 2 == 0) ? 1 : 2;
                sum += (digit * weight) > 9 ? (digit * weight) - 9 : digit * weight;
            }
            return sum % 10 == 0;
        }
    }
}
