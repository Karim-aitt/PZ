"""empty message

Revision ID: 7aef609cdf7c
Revises: 6b4c50c71d3d
Create Date: 2022-07-14 21:19:06.683670

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7aef609cdf7c'
down_revision = '6b4c50c71d3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('beer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('image', sa.String(length=120), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('smell', sa.String(length=80), nullable=True),
    sa.Column('source', sa.String(length=80), nullable=True),
    sa.Column('alcohol', sa.String(length=80), nullable=True),
    sa.Column('company', sa.String(length=80), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('creation_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['category.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('beer_id', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=False),
    sa.Column('creation_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ilikeit',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('beer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('vote',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('beer_id', sa.Integer(), nullable=True),
    sa.Column('punctuation', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['beer_id'], ['beer.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('user', sa.Column('nickname', sa.String(), nullable=False))
    op.add_column('user', sa.Column('name', sa.String(), nullable=False))
    op.add_column('user', sa.Column('surnames', sa.String(), nullable=False))
    op.alter_column('user', 'password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=250),
               existing_nullable=False)
    op.create_unique_constraint(None, 'user', ['nickname'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.alter_column('user', 'password',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
    op.drop_column('user', 'surnames')
    op.drop_column('user', 'name')
    op.drop_column('user', 'nickname')
    op.drop_table('vote')
    op.drop_table('ilikeit')
    op.drop_table('comment')
    op.drop_table('beer')
    op.drop_table('category')
    # ### end Alembic commands ###
