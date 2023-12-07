import { IsNotEmpty, IsNumber, Min, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimeSlotDto {
  @IsNotEmpty()
  start: string;

  @IsNotEmpty()
  end: string;
}

class DayAvailabilityDto {
  @IsNotEmpty()
  day: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  timeSlots: TimeSlotDto[];
}

export class CreateSalleDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  nombrePlace: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixHeure: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  tempDispo: DayAvailabilityDto[]; // Make sure tempDispo is properly typed
}
