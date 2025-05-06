﻿using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.Item
{
    public class CreateDTO
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string[] Categories { get; set; }
    }
}
