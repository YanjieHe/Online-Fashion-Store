package com.company.store.models;


import javax.persistence.*;

@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"Category_Name"}
                )
        }
)
public class ProductCategory {
    @Id
    @Column(name = "Category_ID")
    private Integer categoryId;

    @Column(name = "Category_Name")
    private String categoryName;

    @Column(name = "Parent_Category_Id", nullable = true)
    private Integer parentCategoryId;

    public ProductCategory() {

    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Integer getParentCategoryId() {
        return parentCategoryId;
    }

    public void setParentCategoryId(Integer parentCategoryId) {
        this.parentCategoryId = parentCategoryId;
    }
}
