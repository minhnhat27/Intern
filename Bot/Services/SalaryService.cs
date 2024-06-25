﻿using Bot.Data;
using Bot.DTO;
using Bot.Models;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class SalaryService : ISalaryService
    {
        private readonly MyDbContext _dbContext;
        public SalaryService(MyDbContext myDbContext)
        {
            _dbContext = myDbContext;
        }

        public async Task<SalaryDTO> AddSalary(SalaryCreateDTO salary)
        {
            var entity = new Salary
            {
                Month = salary.Month,
                Year = salary.Year,
                UserId = salary.UserId,
                Price = salary.Price,
                Bonus = salary.Bonus,
                Description = salary.Description
            };
            await _dbContext.Salaries.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return new SalaryDTO
            {
                Month = entity.Month,
                Year = entity.Year,
                UserId = entity.UserId,
                Price = entity.Price,
                Bonus = entity.Bonus,
                Description = entity.Description
            };
        }

        public async Task<bool> DeleteSalary(int month, int year, string userId)
        {
            var salary = await _dbContext.Salaries.FindAsync(month, year, userId);
            if (salary != null)
            {
                _dbContext.Remove(salary);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<SalaryDTO>> GetSalaries()
        {
            return await _dbContext.Salaries
                .Select(s => new SalaryDTO
                {
                    Month = s.Month,
                    Year = s.Year,
                    UserId = s.UserId,
                    Price = s.Price,
                    Bonus = s.Bonus,
                    Description = s.Description
                }).ToListAsync();
        }

        public async Task<SalaryDTO> UpdateSalary(int month, int year, string userId, SalaryUpdateDTO salary)
        {
            var existingSalary = await _dbContext.Salaries.FindAsync(month, year, userId);
            if (existingSalary == null)
            {
                return null;
            }
            existingSalary.Price = salary.Price;
            existingSalary.Bonus = salary.Bonus;
            existingSalary.Description = salary.Description;

            await _dbContext.SaveChangesAsync();
            return new SalaryDTO
            {
                Month = existingSalary.Month,
                Year = existingSalary.Year,
                UserId = existingSalary.UserId,
                Price = existingSalary.Price,
                Bonus = existingSalary.Bonus,
                Description = existingSalary.Description
            };
        }
    }
}