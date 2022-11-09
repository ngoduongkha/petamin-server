import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { TransactionService } from './transaction.service';
import { CreateTransferDto } from './dto/create-transfer.dto';

@ApiTags('transfers')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('transfers')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/:userId')
  getTransferWithUser(
    @GetUser('id') me: string,
    @Param('userId') userId: string,
  ) {
    return this.transactionService.getTransferBetween(me, userId);
  }

  @Post()
  transferPet(
    @GetUser('id') vendorId: string,
    @Body() createTransferDto: CreateTransferDto,
  ) {
    return this.transactionService.createTransfer(vendorId, createTransferDto);
  }

  @Post(':transactionId/cancel')
  async cancelTransfer(
    @GetUser('id') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return await this.transactionService.cancelTransfer(userId, transactionId);
  }

  @Post(':transactionId/complete')
  async completeTransfer(
    @GetUser('id') userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return await this.transactionService.completeTransfer(
      userId,
      transactionId,
    );
  }
}
