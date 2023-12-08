import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ModifyTimeSlotDto {
  @IsOptional()
  @IsNotEmpty()
  start?: string;

  @IsOptional()
  @IsNotEmpty()
  end?: string;
}

class ModifyDayAvailabilityDto {
  @IsOptional()
  @IsNotEmpty()
  day?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ModifyTimeSlotDto)
  timeSlots?: ModifyTimeSlotDto[];
}

export class ModifySalleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  nombrePlace?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixHeure?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ModifyDayAvailabilityDto)
  tempDispo?: ModifyDayAvailabilityDto[]; // Make sure tempDispo is properly typed
}
